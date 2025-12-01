
    module.exports = function (app) {
        const modelName = "storage_bill";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            type: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Type, p, false, true, true, true, true, true, true, , , , ," },
gbStored: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "GB stored, p, false, true, true, true, true, true, true, , , , ," },
gbDownloaded: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "GB downloaded, p, false, true, true, true, true, true, true, , , , ," },
uploadOperations: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Upload operations, p, false, true, true, true, true, true, true, , , , ," },
downloadOperations: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Download operations, p, false, true, true, true, true, true, true, , , , ," },
bucketsPerProject: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Buckets per project, p, false, true, true, true, true, true, true, , , , ," },

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