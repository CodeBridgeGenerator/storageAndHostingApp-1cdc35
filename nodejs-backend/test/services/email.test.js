const assert = require("assert");
const app = require("../../src/app");

describe("email service", () => {
  let thisService;
  let emailCreated;

  beforeEach(async () => {
    thisService = await app.service("email");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (email)");
  });

  describe("#create", () => {
    const options = {"type":"new value","emailMessages":"new value"};

    beforeEach(async () => {
      emailCreated = await thisService.create(options);
    });

    it("should create a new email", () => {
      assert.strictEqual(emailCreated.type, options.type);
assert.strictEqual(emailCreated.emailMessages, options.emailMessages);
    });
  });

  describe("#get", () => {
    it("should retrieve a email by ID", async () => {
      const retrieved = await thisService.get(emailCreated._id);
      assert.strictEqual(retrieved._id, emailCreated._id);
    });
  });

  describe("#update", () => {
    let emailUpdated;
    const options = {"type":"updated value","emailMessages":"updated value"};

    beforeEach(async () => {
      emailUpdated = await thisService.update(emailCreated._id, options);
    });

    it("should update an existing email ", async () => {
      assert.strictEqual(emailUpdated.type, options.type);
assert.strictEqual(emailUpdated.emailMessages, options.emailMessages);
    });
  });

  describe("#delete", () => {
  let emailDeleted;
    beforeEach(async () => {
      emailDeleted = await thisService.remove(emailCreated._id);
    });

    it("should delete a email", async () => {
      assert.strictEqual(emailDeleted._id, emailCreated._id);
    });
  });
});