const assert = require("assert");
const app = require("../../src/app");

describe("storageBill service", () => {
  let thisService;
  let storageBillCreated;

  beforeEach(async () => {
    thisService = await app.service("storageBill");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (storageBill)");
  });

  describe("#create", () => {
    const options = {"type":"new value","gbStored":"new value","gbDownloaded":"new value","uploadOperations":"new value","downloadOperations":"new value","bucketsPerProject":"new value"};

    beforeEach(async () => {
      storageBillCreated = await thisService.create(options);
    });

    it("should create a new storageBill", () => {
      assert.strictEqual(storageBillCreated.type, options.type);
assert.strictEqual(storageBillCreated.gbStored, options.gbStored);
assert.strictEqual(storageBillCreated.gbDownloaded, options.gbDownloaded);
assert.strictEqual(storageBillCreated.uploadOperations, options.uploadOperations);
assert.strictEqual(storageBillCreated.downloadOperations, options.downloadOperations);
assert.strictEqual(storageBillCreated.bucketsPerProject, options.bucketsPerProject);
    });
  });

  describe("#get", () => {
    it("should retrieve a storageBill by ID", async () => {
      const retrieved = await thisService.get(storageBillCreated._id);
      assert.strictEqual(retrieved._id, storageBillCreated._id);
    });
  });

  describe("#update", () => {
    let storageBillUpdated;
    const options = {"type":"updated value","gbStored":"updated value","gbDownloaded":"updated value","uploadOperations":"updated value","downloadOperations":"updated value","bucketsPerProject":"updated value"};

    beforeEach(async () => {
      storageBillUpdated = await thisService.update(storageBillCreated._id, options);
    });

    it("should update an existing storageBill ", async () => {
      assert.strictEqual(storageBillUpdated.type, options.type);
assert.strictEqual(storageBillUpdated.gbStored, options.gbStored);
assert.strictEqual(storageBillUpdated.gbDownloaded, options.gbDownloaded);
assert.strictEqual(storageBillUpdated.uploadOperations, options.uploadOperations);
assert.strictEqual(storageBillUpdated.downloadOperations, options.downloadOperations);
assert.strictEqual(storageBillUpdated.bucketsPerProject, options.bucketsPerProject);
    });
  });

  describe("#delete", () => {
  let storageBillDeleted;
    beforeEach(async () => {
      storageBillDeleted = await thisService.remove(storageBillCreated._id);
    });

    it("should delete a storageBill", async () => {
      assert.strictEqual(storageBillDeleted._id, storageBillCreated._id);
    });
  });
});