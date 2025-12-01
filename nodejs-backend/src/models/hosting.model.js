
    module.exports = function (app) {
        const modelName = "hosting";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            type: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Type, p, false, true, true, true, true, true, true, , , , ," },
storage: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Storage, p, false, true, true, true, true, true, true, , , , ," },
dataTransfer: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Data transfer, p, false, true, true, true, true, true, true, , , , ," },
domainSsl: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Domain & SSL, p, false, true, true, true, true, true, true, , , , ," },
sitesPerProject: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Sites per project, p, false, true, true, true, true, true, true, , , , ," },

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