// Compatibility shim: some modules import from ../../utils/abstracts/FindService
// while the real implementation lives in ../abstract/FindService.js
try {
  module.exports = require("../abstract/FindService");
} catch (err) {
  // If that fails, throw a clearer error to aid debugging
  const e = new Error("Failed to load FindService compatibility shim: " + err.message);
  e.stack = err.stack;
  throw e;
}
