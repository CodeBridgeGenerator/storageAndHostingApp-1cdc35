
    module.exports = function (app) {
        const modelName = "ai_embeddings";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            type: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Type, p, false, true, true, true, true, true, true, , , , ," },
tokens: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Tokens, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };