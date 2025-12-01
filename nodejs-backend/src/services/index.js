
const rateTable = require("./rateTable/rateTable.service.js");
const projects = require("./projects/projects.service.js");
const projectgcp = require("./projectgcp/projectgcp.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    
  app.configure(rateTable);
  app.configure(projects);
  app.configure(projectgcp);
    // ~cb-add-configure-service-name~
};
