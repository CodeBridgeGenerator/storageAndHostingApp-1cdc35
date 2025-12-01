
    module.exports = function (app) {
        const modelName = "projects";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            projectId: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Project ID, p, false, true, true, true, true, true, true, , , , ," },
projectName: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Project Name, p, false, true, true, true, true, true, true, , , , ," },

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