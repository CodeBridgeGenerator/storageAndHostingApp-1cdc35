module.exports = {
  before: {
    update: async (context) => {
      await createEmbedding(context, "update");
      return context;
    },
    patch: async (context) => {
      await createEmbedding(context, "patch");
      return context;
    },
  },
};

// Initialize embeddings
const { HuggingFaceTransformersEmbeddings } =
  await import("@langchain/community/embeddings/hf_transformers");
const embeddings = new HuggingFaceTransformersEmbeddings({
  modelName: "Xenova/all-MiniLM-L6-v2",
  maxConcurrency: 1,
});

async function createEmbedding(context, action, result = null) {
  // console.log(context);
  const { app, method, params, data, path } = context;

  if (!params.user || !params.user._id) {
    return;
  }

  try {
    // Generate query embedding
    const queryEmbedding = await embeddings.embedQuery(JSON.stringify(data));
    if (queryEmbedding.length !== 384) {
      throw new Error(
        `Invalid query embedding dimension: ${queryEmbedding.length}`,
      );
    }

    context.data.embeddings = queryEmbedding;
    return context;
  } catch (error) {
    console.error("Error creating embedding log:", error);
  }
}
