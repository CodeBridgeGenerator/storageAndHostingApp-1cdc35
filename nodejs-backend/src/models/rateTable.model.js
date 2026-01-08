module.exports = function (app) {
  const modelName = "rate_table";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      billType: {
        type: String,
        minLength: 2,
        maxLength: 999,
        index: true,
        trim: true,
        comment:
          "Bill Type, p, false, true, true, true, true, true, true, , , , ,",
      },
      category: {
        type: String,
        minLength: 2,
        maxLength: 999,
        index: true,
        trim: true,
        comment:
          "Category, p, false, true, true, true, true, true, true, , , , ,",
      },
      items: {
        type: String,
        minLength: 2,
        maxLength: 999,
        index: true,
        trim: true,
        comment: "Items, p, false, true, true, true, true, true, true, , , , ,",
      },
      description: {
        type: String,
        minLength: 2,
        maxLength: 999,
        index: true,
        trim: true,
        comment:
          "Description, p, false, true, true, true, true, true, true, , , , ,",
      },
      base: {
        type: String,
        minLength: 1,
        maxLength: 999,
        index: true,
        trim: true,
        comment: "Base, p, false, true, true, true, true, true, true, , , , ,",
      },
      unit: {
        type: String,
        minLength: 1,
        maxLength: 999,
        index: true,
        trim: true,
        comment: "Unit, p, false, true, true, true, true, true, true, , , , ,",
      },
      markUp10: {
        type: Number,
        max: 99999999,
        comment:
          "MarkUp (10%), p_number, false, true, true, true, true, true, true, , , , ,",
      },
      finalAmount: {
        type: Number,
        max: 99999999,
        comment:
          "Final Amount, p_number, false, true, true, true, true, true, true, , , , ,",
      },
      currency: {
        type: String,
        minLength: 2,
        maxLength: 999,
        index: true,
        trim: true,
        comment:
          "Currency, p, false, true, true, true, true, true, true, , , , ,",
      },
      planLimit: {
        type: String,
        minLength: 2,
        maxLength: 999,
        index: true,
        trim: true,
        comment:
          "Plan Limit, p, false, true, true, true, true, true, true, , , , ,",
      },

      createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
      updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
    },
    {
      embeddings: [{ type: Number }],
      timestamps: true,
    },
  );

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
