const { vectorSearch } = require("../../workersQue/processVectorSearch");

module.exports = async function (request, response) {
  try {
    return await vectorSearch(request, response);
  } catch (error) {
    console.error("Vector search failed:", error.message);
    
    // Try to still generate the embedding even if vector search fails
    try {
      const { question } = request.body;
      if (question) {
        const { HuggingFaceTransformersEmbeddings } = await import("@langchain/community/embeddings/hf_transformers");
        const embeddings = new HuggingFaceTransformersEmbeddings({
          modelName: "Xenova/all-MiniLM-L6-v2",
          maxConcurrency: 1,
        });
        const queryEmbedding = await embeddings.embedQuery(question);
        
        return response.status(200).json({
          success: true,
          queryEmbedding: queryEmbedding,
          sourceDocuments: [],
          warning: `Vector search unavailable: ${error.message}`,
        });
      }
    } catch (embedErr) {
      console.error("Embedding generation also failed:", embedErr.message);
    }
    
    // Fallback if embedding generation fails
    return response.status(200).json({
      success: true,
      sourceDocuments: [],
      warning: `Vector search unavailable: ${error.message}`,
    });
  }
};
