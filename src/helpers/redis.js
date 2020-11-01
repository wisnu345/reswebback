const redis = require("redis");
const redisClient = redis.createClient();
const { successWithMeta } = require("../helpers/response");


var _ = require("lodash");
// var _ = require('lodash/core');
var fp = require("lodash/fp");

// Load method categories.
var array = require("lodash/array");
var object = require("lodash/fp/object");

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require("lodash/at");
var curryN = require("lodash/fp/curryN");

module.exports = {
  getallRedis: (req, res, next) => {
    redisClient.get("products", function (err, reply) {
      if (reply) {
        const dataredis = JSON.parse(reply);

        const search = !req.query.name ? "" : req.query.name;
        const outputsearch = _.filter(dataredis, (obj) => {
          return obj.product_name.toLowerCase().includes(search);
        });

        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const start = page === 1? 0 : (page*limit)-limit
        const offset = start === 0 ? limit : start * limit;

        const sortField = !req.query.orderby ? "id" : req.query.orderby;
        const typeSort = !req.query.typesort ? "asc" : req.query.typesort;

        const outputSort = _.orderBy(outputsearch, [sortField], [typeSort]);
        // console.log(_.orderBy)

        //pagination
        const outputPagination = _.slice(outputSort, start, offset)
        const meta = {
          totalRow: outputSort.length,
          totalPage: Math.ceil(outputSort.length / limit),
          currentPage: page,
          limit,
        };
        successWithMeta(res,outputPagination,meta,  "Data from Redis");
      } else {
        next();
      }
    });
  },
  getallRedisHistory: (req, res, next) => {
    redisClient.get("history", function (err, reply) {
      if (reply) {
        const dataredis = JSON.parse(reply);

        const search = !req.query.name ? "" : req.query.name;
        const outputsearch = _.filter(dataredis, (obj) => {
          return obj.product_name.toLowerCase().includes(search);
        });

        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const start = page === 1? 0 : (page*limit)-limit
        const offset = start === 0 ? limit : start * limit;

        const sortField = !req.query.orderby ? "id" : req.query.orderby;
        const typeSort = !req.query.typeSort ? "asc" : req.query.typeSort;

        const outputSort = _.orderBy(outputsearch, [sortField], [typeSort]);
        // console.log(_.orderBy)

        //pagination
        const outputPagination = _.slice(outputSort, start, offset)
        const meta = {
          totalRow: outputSort.length,
          totalPage: Math.ceil(outputSort.length / limit),
          currentPage: page,
          limit,
        };
        successWithMeta(res,outputPagination,meta,  "Data from Redis");
      } else {
        next();
      }
    });
  },
  getallRedisCategory: (req, res, next) => {
    redisClient.get("category", function (err, reply) {
      if (reply) {
        const dataredis = JSON.parse(reply);
        successWithMeta(res, dataredis,  "Data from Redis");
      } else {
        next();
      }
    });
  },
};
