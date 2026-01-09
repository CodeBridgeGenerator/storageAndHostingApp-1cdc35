const { authenticate } = require("@feathersjs/authentication").hooks;

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [
      // Ensure prompt embedding is generated server-side when missing
      async (context) => {
        try {
          const { data } = context;
          if (!data) return context;
          if (!data.promptEmbedding && data.prompt) {
            const { HuggingFaceTransformersEmbeddings } = await import(
              "@langchain/community/embeddings/hf_transformers"
            );
            const embeddings = new HuggingFaceTransformersEmbeddings({
              modelName: "Xenova/all-MiniLM-L6-v2",
              maxConcurrency: 1,
            });
            const queryEmbedding = await embeddings.embedQuery(data.prompt);
            if (Array.isArray(queryEmbedding)) {
              data.promptEmbedding = queryEmbedding;
            }
          }
          // If embedding is explicitly null, remove the field so Mongoose doesn't store null
          if (data.promptEmbedding === null) {
            delete data.promptEmbedding;
          }
        } catch (err) {
          console.error("Prompt embedding generation failed:", err?.message || err);
          // don't block creation if embedding generation fails
        }
        return context;
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
