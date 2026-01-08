// Compatibility shim: some modules import from ../abstracts/FindService
// while the real implementation lives in ../abstract/FindService.js
try {
  module.exports = require("../abstract/FindService");
} catch (err) {
  // If that fails, throw a clearer error to aid debugging
  const e = new Error("Failed to load FindService compatibility shim: " + err.message);
  e.stack = err.stack;
  throw e;
}

module.exports = (Base) =>
  class FindService extends Base {
    async find(params) {
      const { q, to, from, field, embeddings } = params.query;
      let { days } = params.query;
      let toDateAgo = new Date("1970-01-01T00:00:00Z");
      if (to) toDateAgo = Date.parse(to) > 0 ? new Date(to) : toDateAgo;
      let fromDateAgo = new Date();
      if (from)
        fromDateAgo = Date.parse(from) > 0 ? new Date(from) : fromDateAgo;
      if (!isNaN(days) && !to) toDateAgo.setDate(fromDateAgo.getDate() - days);
      else days = fromDateAgo.getDate() - toDateAgo.getDate();

      if (q === "unique") {
        if (field) {
          return await this.Model.distinct(field);
        } else return { error: "field not found" };
      }

      if (q === "aggregate") {
        return await this.Model.aggregate([
          {
            $match: {
              createdAt: { $gte: toDateAgo, $lte: fromDateAgo }, // filter only recent docs
            },
          },
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              status: "$_id",
              count: 1,
            },
          },
        ]);
      }

      if (q === "range") {
        const result = await this.Model.aggregate([
          {
            $match: {
              createdAt: { $gte: toDateAgo, $lte: fromDateAgo }, // only include recent documents
            },
          },
          {
            $group: {
              _id: null,
              firstDate: { $min: "$createdAt" },
              lastDate: { $max: "$createdAt" },
            },
          },
          {
            $project: {
              _id: 0,
              firstDate: 1,
              lastDate: 1,
              daysAgo: { $literal: days },
            },
          },
        ]);

        if(q === "vectorSearch" && embeddings) if (q === "vectorSearch" && embeddings) {
            const queryVector = [
                -0.034731735,
                0.008558298,
                -0.0153717,
                -0.029912498,
                // ...rest of your embedding dimensions
                0.010303194,
                -0.019193852,
                0.025093261,
            ];

            const result = await this.Model.aggregate([
                {
                // The main Vector Search stage must be the first stage
                $vectorSearch: {
                    index: "vector_index",           // your Atlas vector index name
                    path: "embedding",    // the field containing embeddings
                    queryVector: queryVector,                 // vector from user prompt
                    numCandidates: 384,                        // max documents to scan
                    limit: 10                                  // top-k results to return
                }
                },
                {
                // Optionally, project only required fields and include similarity score
                $project: {
                    _id: 0,
                    title: 1,
                    plot: 1,
                    score: { $meta: "vectorSearchScore" }     // relevance score
                }
                }
            ]);
        }

        return result[0] || { firstDate: null, lastDate: null, daysAgo: days };
      }

      if (q === "count") {
        const total = await this.Model.countDocuments({
          createdAt: { $gte: toDateAgo, $lte: fromDateAgo },
        });

        return { total };
      }
      return super.find(params);
    }

    async search(query, params) {
      const allItems = await super.find(params);
      return Array.isArray(allItems)
        ? allItems.filter((item) => matchSearch(item, query))
        : [allItems].filter((item) => matchSearch(item, query));
    }

    matchSearch(item, query) {
      return JSON.stringify(item)
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());
    }
  };
