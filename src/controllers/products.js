const productsModel = require("../models/products.js");
const { success, failed, successWithMeta } = require("../helpers/response");
const upload = require("../helpers/upload");

const redis = require("redis");
const redisClient = redis.createClient();

const products = {
  getAll: (req, res) => {
    const productName = !req.query.name ? "" : req.query.name;
    const sorttypes = req.query.typesort === "desc" ? "DESC" : "ASC";
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const offset = page === 1 ? 0 : (page - 1) * limit;
    let order = req.query.orderby;
    if (order === "price") {
      order = "product_price";
    } else if (order === "name") {
      order = "product_name";
    } else if (order === "category") {
      order = "category_name";
    } else {
      order = "date";
    }
    productsModel
      .getAll(productName, sorttypes, limit, offset, order)
      .then((result) => {
        const totalRow = result[0].count;
        const meta = {
          totalRow,
          totalPage: Math.ceil(totalRow / limit),
          currentPage: page,
        };
        // redisClient.set("products", JSON.stringify(result));
        successWithMeta(
          res,
          result,
          meta,
          "Get all Product success from Database"
        );
      })
      .catch((err) => {
        failed(res, [], err.message);
      });
    // get all redis

    productsModel
      .getAllRedis()
      .then((result) => {
        redisClient.set("products", JSON.stringify(result));
      })
      .catch((err) => {
        failed(res, [], err.message);
      });
  },
  getDetail: (req, res) => {
    const id = req.params.id_product;
    productsModel
      .getDetail(id)
      .then((result) => {
        success(res, result, "Get detail Product success");
      })
      .catch((err) => {
        failed(res, [], err.message);
      });
  },
  insert: (req, res) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        failed(res, [], err);
      } else {
        const body = req.body;
        body.image = req.file.filename;
        // console.log(body)
        productsModel
          .insert(body)
          .then((result) => {
            redisClient.del("products");
            success(res, result, "Insert product success");
          })
          .catch((err) => {
            failed(res, [], err.message);
          });
      }
    });
  },
  update: (req, res) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        failed(res, [], err);
      } else {
        const id = req.params.id_product;
        const body = req.body;
        body.image = req.file.filename;
        productsModel
          .update(body, id)
          .then((result) => {
            redisClient.del("products");
            success(res, result, "Update products success");
          })
          .catch((err) => {
            failed(res, [], err.message);
          });
      }
    });
  },
  destroy: (req, res) => {
    const id = req.params.id;
    productsModel
      .destroy(id)
      .then((result) => {
        redisClient.del("products");
        success(res, result, "Delete product success");
      })
      .catch((err) => {
        failed(res, [], err.message);
      });
  },
  updateDetail: (req, res) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        failed(res, [], err);
      } else {
        const id = req.params.id;
        const data = req.body;
        data.image = !req.file ? "" : req.file.filename;
        console.log(data);
        // console.log(data.image)
        productsModel
          .updateDetail(data, id)
          .then((result) => {
            redisClient.del("products");
            success(res, result, "Update data success");
          })
          .catch((err) => {
            failed(res, [], err.message);
          });
      }
    });
  },
};

module.exports = products;
