const assert = require("assert");
const app = require("../../src/app");

describe("projects service", () => {
  let thisService;
  let projectCreated;

  beforeEach(async () => {
    thisService = await app.service("projects");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (projects)");
  });

  describe("#create", () => {
    const options = {"projectId":"new value","projectName":"new value"};

    beforeEach(async () => {
      projectCreated = await thisService.create(options);
    });

    it("should create a new project", () => {
      assert.strictEqual(projectCreated.projectId, options.projectId);
assert.strictEqual(projectCreated.projectName, options.projectName);
    });
  });

  describe("#get", () => {
    it("should retrieve a project by ID", async () => {
      const retrieved = await thisService.get(projectCreated._id);
      assert.strictEqual(retrieved._id, projectCreated._id);
    });
  });

  describe("#update", () => {
    let projectUpdated;
    const options = {"projectId":"updated value","projectName":"updated value"};

    beforeEach(async () => {
      projectUpdated = await thisService.update(projectCreated._id, options);
    });

    it("should update an existing project ", async () => {
      assert.strictEqual(projectUpdated.projectId, options.projectId);
assert.strictEqual(projectUpdated.projectName, options.projectName);
    });
  });

  describe("#delete", () => {
  let projectDeleted;
    beforeEach(async () => {
      projectDeleted = await thisService.remove(projectCreated._id);
    });

    it("should delete a project", async () => {
      assert.strictEqual(projectDeleted._id, projectCreated._id);
    });
  });
});