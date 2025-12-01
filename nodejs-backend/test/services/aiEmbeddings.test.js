const assert = require("assert");
const app = require("../../src/app");

describe("aiEmbeddings service", () => {
  let thisService;
  let aiEmbeddingCreated;

  beforeEach(async () => {
    thisService = await app.service("aiEmbeddings");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (aiEmbeddings)");
  });

  describe("#create", () => {
    const options = {"type":"new value","tokens":"new value"};

    beforeEach(async () => {
      aiEmbeddingCreated = await thisService.create(options);
    });

    it("should create a new aiEmbedding", () => {
      assert.strictEqual(aiEmbeddingCreated.type, options.type);
assert.strictEqual(aiEmbeddingCreated.tokens, options.tokens);
    });
  });

  describe("#get", () => {
    it("should retrieve a aiEmbedding by ID", async () => {
      const retrieved = await thisService.get(aiEmbeddingCreated._id);
      assert.strictEqual(retrieved._id, aiEmbeddingCreated._id);
    });
  });

  describe("#update", () => {
    let aiEmbeddingUpdated;
    const options = {"type":"updated value","tokens":"updated value"};

    beforeEach(async () => {
      aiEmbeddingUpdated = await thisService.update(aiEmbeddingCreated._id, options);
    });

    it("should update an existing aiEmbedding ", async () => {
      assert.strictEqual(aiEmbeddingUpdated.type, options.type);
assert.strictEqual(aiEmbeddingUpdated.tokens, options.tokens);
    });
  });

  describe("#delete", () => {
  let aiEmbeddingDeleted;
    beforeEach(async () => {
      aiEmbeddingDeleted = await thisService.remove(aiEmbeddingCreated._id);
    });

    it("should delete a aiEmbedding", async () => {
      assert.strictEqual(aiEmbeddingDeleted._id, aiEmbeddingCreated._id);
    });
  });
});