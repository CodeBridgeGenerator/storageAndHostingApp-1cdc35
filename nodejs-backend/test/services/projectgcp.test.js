const assert = require("assert");
const app = require("../../src/app");

describe("projectgcp service", () => {
  let thisService;
  let projectgcpCreated;

  beforeEach(async () => {
    thisService = await app.service("projectgcp");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (projectgcp)");
  });

  describe("#create", () => {
    const options = {"projectId":"new value","env":"new value","gcpProjectId":"new value","location":"new value","imageUri":"new value","imageName":"new value","authentication":true,"serviceAccount":"new value","memory":"new value","cpu":"new value","concurrency":"new value","maxInstances":"new value","minInstances":"new value","vpcConnector":"new value","vpcEgress":"new value"};

    beforeEach(async () => {
      projectgcpCreated = await thisService.create(options);
    });

    it("should create a new projectgcp", () => {
      assert.strictEqual(projectgcpCreated.projectId, options.projectId);
assert.strictEqual(projectgcpCreated.env, options.env);
assert.strictEqual(projectgcpCreated.gcpProjectId, options.gcpProjectId);
assert.strictEqual(projectgcpCreated.location, options.location);
assert.strictEqual(projectgcpCreated.imageUri, options.imageUri);
assert.strictEqual(projectgcpCreated.imageName, options.imageName);
assert.strictEqual(projectgcpCreated.authentication, options.authentication);
assert.strictEqual(projectgcpCreated.serviceAccount, options.serviceAccount);
assert.strictEqual(projectgcpCreated.memory, options.memory);
assert.strictEqual(projectgcpCreated.cpu, options.cpu);
assert.strictEqual(projectgcpCreated.concurrency, options.concurrency);
assert.strictEqual(projectgcpCreated.maxInstances, options.maxInstances);
assert.strictEqual(projectgcpCreated.minInstances, options.minInstances);
assert.strictEqual(projectgcpCreated.vpcConnector, options.vpcConnector);
assert.strictEqual(projectgcpCreated.vpcEgress, options.vpcEgress);
    });
  });

  describe("#get", () => {
    it("should retrieve a projectgcp by ID", async () => {
      const retrieved = await thisService.get(projectgcpCreated._id);
      assert.strictEqual(retrieved._id, projectgcpCreated._id);
    });
  });

  describe("#update", () => {
    let projectgcpUpdated;
    const options = {"projectId":"updated value","env":"updated value","gcpProjectId":"updated value","location":"updated value","imageUri":"updated value","imageName":"updated value","authentication":false,"serviceAccount":"updated value","memory":"updated value","cpu":"updated value","concurrency":"updated value","maxInstances":"updated value","minInstances":"updated value","vpcConnector":"updated value","vpcEgress":"updated value"};

    beforeEach(async () => {
      projectgcpUpdated = await thisService.update(projectgcpCreated._id, options);
    });

    it("should update an existing projectgcp ", async () => {
      assert.strictEqual(projectgcpUpdated.projectId, options.projectId);
assert.strictEqual(projectgcpUpdated.env, options.env);
assert.strictEqual(projectgcpUpdated.gcpProjectId, options.gcpProjectId);
assert.strictEqual(projectgcpUpdated.location, options.location);
assert.strictEqual(projectgcpUpdated.imageUri, options.imageUri);
assert.strictEqual(projectgcpUpdated.imageName, options.imageName);
assert.strictEqual(projectgcpUpdated.authentication, options.authentication);
assert.strictEqual(projectgcpUpdated.serviceAccount, options.serviceAccount);
assert.strictEqual(projectgcpUpdated.memory, options.memory);
assert.strictEqual(projectgcpUpdated.cpu, options.cpu);
assert.strictEqual(projectgcpUpdated.concurrency, options.concurrency);
assert.strictEqual(projectgcpUpdated.maxInstances, options.maxInstances);
assert.strictEqual(projectgcpUpdated.minInstances, options.minInstances);
assert.strictEqual(projectgcpUpdated.vpcConnector, options.vpcConnector);
assert.strictEqual(projectgcpUpdated.vpcEgress, options.vpcEgress);
    });
  });

  describe("#delete", () => {
  let projectgcpDeleted;
    beforeEach(async () => {
      projectgcpDeleted = await thisService.remove(projectgcpCreated._id);
    });

    it("should delete a projectgcp", async () => {
      assert.strictEqual(projectgcpDeleted._id, projectgcpCreated._id);
    });
  });
});