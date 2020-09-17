const categoriesModel = require('../models/category.js')
const { success, failed } = require('../helpers/response')

const redis = require("redis");
const redisClient = redis.createClient();

const products = {
  getAll: (req, res) => {
    const categoryName = !req.query.name ? '' : req.query.name
    categoriesModel.getAll(categoryName)
    .then((result) => {
      redisClient.set("category", JSON.stringify(result));
      success(res, result, 'Get all Categories success')
    })
    .catch((err) => {
      failed(res, [], err.message)
    })
  },
  insert: (req, res) => {
    const body = req.body
    console.log(body)
    categoriesModel.insert(body)
    .then((result) => {
      redisClient.del("category");
      success(res, result, 'Insert category success')
    })
    .catch((err) => {
      failed(res, [], err.message)
    })
  },
  update: (req, res) => {
    const id = req.params.id
    const body = req.body
    categoriesModel.update(body, id)
    .then((result) => {
      redisClient.del("category");
      success(res, result, 'Update category success')
    })
    .catch((err) => {
      failed(res, [], err.message)
    })
  },
  destroy: (req, res) => {
    const id = req.params.id
    categoriesModel.destroy(id)
    .then((result) => {
      redisClient.del("category");
      success(res, result, 'Delete category success')
    })
    .catch((err) => {
      failed(res, [], err.message)
    })
  }
}

module.exports = products