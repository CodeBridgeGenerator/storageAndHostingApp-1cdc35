const assert = require("assert");
const app = require("../../src/app");

describe("fileconvertor service", () => {
  let thisService;
  let fileconvertorCreated;

  beforeEach(async () => {
    thisService = await app.service("fileconvertor");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (fileconvertor)");
  });

  describe("#create", () => {
    const options = {"type":"new value","fileSize":"new value"};

    beforeEach(async () => {
      fileconvertorCreated = await thisService.create(options);
    });

    it("should create a new fileconvertor", () => {
      assert.strictEqual(fileconvertorCreated.type, options.type);
assert.strictEqual(fileconvertorCreated.fileSize, options.fileSize);
    });
  });

  describe("#get", () => {
    it("should retrieve a fileconvertor by ID", async () => {
      const retrieved = await thisService.get(fileconvertorCreated._id);
      assert.strictEqual(retrieved._id, fileconvertorCreated._id);
    });
  });

  describe("#update", () => {
    let fileconvertorUpdated;
    const options = {"type":"updated value","fileSize":"updated value"};

    beforeEach(async () => {
      fileconvertorUpdated = await thisService.update(fileconvertorCreated._id, options);
    });

    it("should update an existing fileconvertor ", async () => {
      assert.strictEqual(fileconvertorUpdated.type, options.type);
assert.strictEqual(fileconvertorUpdated.fileSize, options.fileSize);
    });
  });

  describe("#delete", () => {
  let fileconvertorDeleted;
    beforeEach(async () => {
      fileconvertorDeleted = await thisService.remove(fileconvertorCreated._id);
    });

    it("should delete a fileconvertor", async () => {
      assert.strictEqual(fileconvertorDeleted._id, fileconvertorCreated._id);
    });
  });
});