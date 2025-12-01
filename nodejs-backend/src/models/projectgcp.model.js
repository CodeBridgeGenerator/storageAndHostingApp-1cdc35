
    module.exports = function (app) {
        const modelName = "projectgcp";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            projectId: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Project ID, p, false, true, true, true, true, true, true, , , , ," },
env: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "env, p, false, true, true, true, true, true, true, , , , ," },
gcpProjectId: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "GCP Project ID, p, false, true, true, true, true, true, true, , , , ," },
location: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Location, p, false, true, true, true, true, true, true, , , , ," },
imageUri: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Image URI, p, false, true, true, true, true, true, true, , , , ," },
imageName: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Image Name, p, false, true, true, true, true, true, true, , , , ," },
authentication: { type: Boolean, required: false, comment: "Authentication, p_boolean, false, true, true, true, true, true, true, , , , ," },
serviceAccount: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Service Account, p, false, true, true, true, true, true, true, , , , ," },
memory: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Memory, p, false, true, true, true, true, true, true, , , , ," },
cpu: { type:  String , minLength: 1, maxLength: 999, index: true, trim: true, comment: "CPU, p, false, true, true, true, true, true, true, , , , ," },
concurrency: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Concurrency, p, false, true, true, true, true, true, true, , , , ," },
maxInstances: { type:  String , minLength: 1, maxLength: 999, index: true, trim: true, comment: "Max Instances, p, false, true, true, true, true, true, true, , , , ," },
minInstances: { type:  String , minLength: 1, maxLength: 999, index: true, trim: true, comment: "Min Instances, p, false, true, true, true, true, true, true, , , , ," },
vpcConnector: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "VPC Connector, p, false, true, true, true, true, true, true, , , , ," },
vpcEgress: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "VPC Egress, p, false, true, true, true, true, true, true, , , , ," },

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