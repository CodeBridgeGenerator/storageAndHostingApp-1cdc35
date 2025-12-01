const assert = require("assert");
const app = require("../../src/app");

describe("rateTable service", () => {
  let thisService;
  let rateTableCreated;

  beforeEach(async () => {
    thisService = await app.service("rateTable");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (rateTable)");
  });

  describe("#create", () => {
    const options = {"billType":"new value","category":"new value","items":"new value","description":"new value","base":"new value","unit":"new value","markUp10":23,"finalAmount":23,"currency":"new value","planLimit":"new value"};

    beforeEach(async () => {
      rateTableCreated = await thisService.create(options);
    });

    it("should create a new rateTable", () => {
      assert.strictEqual(rateTableCreated.billType, options.billType);
assert.strictEqual(rateTableCreated.category, options.category);
assert.strictEqual(rateTableCreated.items, options.items);
assert.strictEqual(rateTableCreated.description, options.description);
assert.strictEqual(rateTableCreated.base, options.base);
assert.strictEqual(rateTableCreated.unit, options.unit);
assert.strictEqual(rateTableCreated.markUp10, options.markUp10);
assert.strictEqual(rateTableCreated.finalAmount, options.finalAmount);
assert.strictEqual(rateTableCreated.currency, options.currency);
assert.strictEqual(rateTableCreated.planLimit, options.planLimit);
    });
  });

  describe("#get", () => {
    it("should retrieve a rateTable by ID", async () => {
      const retrieved = await thisService.get(rateTableCreated._id);
      assert.strictEqual(retrieved._id, rateTableCreated._id);
    });
  });

  describe("#update", () => {
    let rateTableUpdated;
    const options = {"billType":"updated value","category":"updated value","items":"updated value","description":"updated value","base":"updated value","unit":"updated value","markUp10":100,"finalAmount":100,"currency":"updated value","planLimit":"updated value"};

    beforeEach(async () => {
      rateTableUpdated = await thisService.update(rateTableCreated._id, options);
    });

    it("should update an existing rateTable ", async () => {
      assert.strictEqual(rateTableUpdated.billType, options.billType);
assert.strictEqual(rateTableUpdated.category, options.category);
assert.strictEqual(rateTableUpdated.items, options.items);
assert.strictEqual(rateTableUpdated.description, options.description);
assert.strictEqual(rateTableUpdated.base, options.base);
assert.strictEqual(rateTableUpdated.unit, options.unit);
assert.strictEqual(rateTableUpdated.markUp10, options.markUp10);
assert.strictEqual(rateTableUpdated.finalAmount, options.finalAmount);
assert.strictEqual(rateTableUpdated.currency, options.currency);
assert.strictEqual(rateTableUpdated.planLimit, options.planLimit);
    });
  });

  describe("#delete", () => {
  let rateTableDeleted;
    beforeEach(async () => {
      rateTableDeleted = await thisService.remove(rateTableCreated._id);
    });

    it("should delete a rateTable", async () => {
      assert.strictEqual(rateTableDeleted._id, rateTableCreated._id);
    });
  });
});