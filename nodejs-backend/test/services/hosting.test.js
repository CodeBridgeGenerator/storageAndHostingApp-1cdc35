const assert = require("assert");
const app = require("../../src/app");

describe("hosting service", () => {
  let thisService;
  let hostingCreated;

  beforeEach(async () => {
    thisService = await app.service("hosting");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (hosting)");
  });

  describe("#create", () => {
    const options = {"type":"new value","storage":"new value","dataTransfer":"new value","domainSsl":"new value","sitesPerProject":"new value"};

    beforeEach(async () => {
      hostingCreated = await thisService.create(options);
    });

    it("should create a new hosting", () => {
      assert.strictEqual(hostingCreated.type, options.type);
assert.strictEqual(hostingCreated.storage, options.storage);
assert.strictEqual(hostingCreated.dataTransfer, options.dataTransfer);
assert.strictEqual(hostingCreated.domainSsl, options.domainSsl);
assert.strictEqual(hostingCreated.sitesPerProject, options.sitesPerProject);
    });
  });

  describe("#get", () => {
    it("should retrieve a hosting by ID", async () => {
      const retrieved = await thisService.get(hostingCreated._id);
      assert.strictEqual(retrieved._id, hostingCreated._id);
    });
  });

  describe("#update", () => {
    let hostingUpdated;
    const options = {"type":"updated value","storage":"updated value","dataTransfer":"updated value","domainSsl":"updated value","sitesPerProject":"updated value"};

    beforeEach(async () => {
      hostingUpdated = await thisService.update(hostingCreated._id, options);
    });

    it("should update an existing hosting ", async () => {
      assert.strictEqual(hostingUpdated.type, options.type);
assert.strictEqual(hostingUpdated.storage, options.storage);
assert.strictEqual(hostingUpdated.dataTransfer, options.dataTransfer);
assert.strictEqual(hostingUpdated.domainSsl, options.domainSsl);
assert.strictEqual(hostingUpdated.sitesPerProject, options.sitesPerProject);
    });
  });

  describe("#delete", () => {
  let hostingDeleted;
    beforeEach(async () => {
      hostingDeleted = await thisService.remove(hostingCreated._id);
    });

    it("should delete a hosting", async () => {
      assert.strictEqual(hostingDeleted._id, hostingCreated._id);
    });
  });
});