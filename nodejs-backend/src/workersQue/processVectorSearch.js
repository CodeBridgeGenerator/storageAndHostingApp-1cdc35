const express = require("@feathersjs/express");
const { MongoClient } = require("mongodb");
const { MongoDBAtlasVectorSearch } = require("@langchain/mongodb");
const axios = require("axios");
const { getEncoding } = require("js-tiktoken");

let encoding;
try {
  encoding = getEncoding("cl100k_base");
} catch (err) {
  encoding = { encode: (text) => new Array(Math.ceil(text.length / 4)) };
}

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const MONGODB_URI =
    "mongodb+srv://codeBridgeApp:g2JHEwy61X0Y0KKK@fileconvertorprd.y9o28zu.mongodb.net/?retryWrites=true&w=majority&appName=FileConvertorPrd";
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

// const splitApiResponse = (text) => {
//   const paragraphs = text.split(/\n\s*\n/);
//   let splitIndex = -1;

//   for (let i = 0; i < paragraphs.length; i++) {
//     const paragraph = paragraphs[i].trim();
//     if (paragraph.match(/^(Relevant Extracts|Citation|Sources):?/i)) {
//       splitIndex = i;
//       break;
//     }
//   }

//   if (splitIndex === -1) {
//     return {
//       initialInference: text.trim(),
//       retrievedFrom: "No relevant extracts or citations available",
//     };
//   }

//   const initialInference = paragraphs.slice(0, splitIndex).join("\n\n").trim();
//   const retrievedFrom = paragraphs.slice(splitIndex).join("\n\n").trim();

//   return {
//     initialInference: initialInference || "No inference content available",
//     retrievedFrom: retrievedFrom || "No relevant extracts or citations available",
//   };
// };

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const MONGODB_URI =
    "mongodb+srv://codeBridgeApp:g2JHEwy61X0Y0KKK@fileconvertorprd.y9o28zu.mongodb.net/?retryWrites=true&w=majority&appName=FileConvertorPrd";
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

async function vectorSearch(request, response) {
  try {
    const {
      question,
      referenceNo,
      k = 10,
      distanceThreshold = 0.5,
    } = request.body;
    if (!question) {
      return response
        .status(400)
        .json({ success: false, error: "Missing question" });
    }

    // Connect to MongoDB
    const client = await connectToDatabase();
    const collection = client
      .db("fileconvertor")
      .collection("VIN_partnership_embeddings");

    // Initialize embeddings
    const { HuggingFaceTransformersEmbeddings } =
      await import("@langchain/community/embeddings/hf_transformers");
    const embeddings = new HuggingFaceTransformersEmbeddings({
      modelName: "Xenova/all-MiniLM-L6-v2",
      maxConcurrency: 1,
    });

    // Generate query embedding
    const queryEmbedding = await embeddings.embedQuery(question);
    if (queryEmbedding.length !== 384) {
      throw new Error(
        `Invalid query embedding dimension: ${queryEmbedding.length}`,
      );
    }

    // Create vector store
    const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
      collection: collection,
      indexName: "vector_index",
      textKey: "text",
      embeddingKey: "embedding",
    });

    // Perform filtered similarity search
    const searchFilter = referenceNo ? { summons_id: { $eq: referenceNo } } : {};
    const filteredResults = await vectorStore.similaritySearchWithScore(
      question,
      k,
      searchFilter,
    );

    // Post-process results to incorporate distance_to_next
    const processedResults = filteredResults.map(([doc, score]) => ({
      content: doc.pageContent,
      metadata: doc.metadata,
      similarityScore: score,
      distanceToNext: doc.metadata.distance_to_next,
    }));

    // Re-rank results based on similarity score and distance_to_next
    const rankedResults = processedResults
      .filter(
        (result) =>
          result.distanceToNext === null ||
          result.distanceToNext <= distanceThreshold,
      )
      .sort((a, b) => {
        // Prioritize higher similarity scores (lower numerical value, as lower is better)
        const scoreDiff = a.similarityScore - b.similarityScore;
        if (Math.abs(scoreDiff) > 0.01) return scoreDiff;

        // For similar scores, prioritize chunks with lower distance_to_next (more cohesive)
        const distA = a.distanceToNext === null ? Infinity : a.distanceToNext;
        const distB = b.distanceToNext === null ? Infinity : b.distanceToNext;
        return distA - distB;
      })
      .slice(0, k); // Ensure we return at most k results

    // console.log(
    //   `Filtered and ranked results (${rankedResults.length}):`,
    //   JSON.stringify(
    //     rankedResults.map((d) => ({
    //       content: d.content,
    //       metadata: d.metadata,
    //       similarityScore: d.similarityScore,
    //       distanceToNext: d.distanceToNext
    //     })),
    //     null,
    //     2
    //   )
    // );

    // Return results with embedding for storage
    response.status(200).json({
      success: true,
      queryEmbedding: queryEmbedding,
      sourceDocuments: rankedResults.map((d) => ({
        content: d.content,
        metadata: d.metadata,
        similarityScore: d.similarityScore,
      })),
    });
  } catch (error) {
    console.error("Vector search error:", error);
    response.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
    });
  }
}

async function llmProxy(request, response) {
  const LLM_API_URL =
    "https://cytcmhlrg2hpzfjymbszuann3m0lmlvn.lambda-url.us-west-2.on.aws";

  try {
    const { question, documents, referenceNo } = request.body;
    if (!question || !documents || !Array.isArray(documents)) {
      return response
        .status(400)
        .json({ success: false, error: "Missing question or documents" });
    }

    const topDocuments = documents.map((doc) => ({ content: doc.content }));

    const apiPayload = {
      documents: topDocuments,
      modelId: "anthropic.claude-3-opus-20240229-v1:0", // Updated model
      preamble: "Given the following documents, answer the question.",
      question: JSON.stringify(question),
      params: {
        max_tokens_to_sample: 4096,
        temperature: 0.2,
        top_k: 10,
        top_p: 0.9,
        stop_sequences: ["Human"],
      },
    };

    // console.log("LLM API payload:", JSON.stringify(apiPayload, null, 2));

    const maxRetries = 5;
    let attempt = 1;
    let llmResponse;

    while (attempt <= maxRetries) {
      try {
        console.log(
          `Attempt ${attempt} to call LLM API for question: ${question}`,
        );
        llmResponse = await axios.post(LLM_API_URL, apiPayload, {
          headers: { "Content-Type": "application/json" },
          timeout: 120000,
        });
        console.log(
          `LLM API succeeded on attempt ${attempt}, response:`,
          JSON.stringify(llmResponse.data, null, 2),
        );
        break;
      } catch (err) {
        console.error(`LLM API attempt ${attempt} failed:`, {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
          rawResponse: err.response?.data,
        });
        if (
          err.response &&
          [502, 503, 501].includes(err.response.status) &&
          attempt < maxRetries
        ) {
          console.warn(`Retrying... (Attempt ${attempt + 1})`);
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * Math.pow(2, attempt)),
          );
          attempt++;
        } else {
          throw err;
        }
      }
    }

    const apiResultContent =
      llmResponse?.data?.response_text || llmResponse?.data;
    if (
      !apiResultContent ||
      (typeof apiResultContent === "string" && apiResultContent.trim() === "")
    ) {
      throw new Error("LLM returned empty or invalid content");
    }

    const { initialInference } = splitApiResponse(
      typeof apiResultContent === "string"
        ? apiResultContent
        : JSON.stringify(apiResultContent),
    );

    // console.log(`LLM proxy response for question "${question}":`, initialInference);

    return response.status(200).json({
      success: true,
      response: initialInference,
    });
  } catch (error) {
    console.error("LLM proxy error:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
    });

    try {
      const { question, documents } = request.body;
      if (!question) {
        throw new Error("Question is undefined in fallback");
      }
      if (!documents || !Array.isArray(documents)) {
        throw new Error("Documents are missing or invalid in fallback");
      }
      if (
        error.response?.status === 501 &&
        error.response?.data?.includes(
          "'NoneType' object has no attribute 'get'",
        )
      ) {
        console.warn("Falling back to manual extraction due to Lambda error");

        const topDocs = documents
          .sort(
            (a, b) =>
              (b.metadata?.similarityScore || 0) -
              (a.metadata?.similarityScore || 0),
          )
          .slice(0, 1);

        const responseText = `Unable to process the question "${question}" due to an internal error. Below is the most relevant document content:\n\n${topDocs[0]?.content || "No content available"}\n\nSource: ${topDocs[0]?.metadata?.file_name || "Document"}`;

        return response.status(200).json({
          success: true,
          response: responseText,
          warning:
            "Extracted manually due to Lambda failure; response based on top document content",
        });
      }
      return response.status(500).json({
        success: false,
        error: error.message,
      });
    } catch (fallbackError) {
      console.error("Fallback error:", {
        message: fallbackError.message,
        stack: fallbackError.stack,
      });
      return response.status(500).json({
        success: false,
        error: `Fallback failed: ${fallbackError.message}`,
      });
    }
  }
}

module.exports = { vectorSearch, llmProxy };
