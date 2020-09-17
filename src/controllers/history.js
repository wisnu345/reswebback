const productsModel = require('../models/history.js')
const { success, failed } = require('../helpers/response')
const { promise } = require('../configs/database.js')

const products = {
  getAll: (req, res) => {
    const productName = !req.query.name ? '' : req.query.name
    const sorttypes = req.query.typesort==='desc' ? 'DESC' : 'ASC'
    const limit = req.query.limit? parseInt(req.query.limit) : 3
    const page = req.query.page? parseInt(req.query.page) : 1
    const offset = page === 1 ? 0 : (page-1)*limit
    productsModel.getAll()
    .then((result) => {
      success(res, result, 'Get all history success')
    })
    .catch((err) => {
      failed(res, [], err.message)
    })
  },
  insert: (req, res) => {
    const body = req.body
    productsModel.insertMaster(body)
    .then((result) => {
      const idMaster = result.insertId
      const insertDetail = body.detailorder.map((item) => {
        item.id_transaction = idMaster
        productsModel.insertDetail(item)
      })
      Promise.all(insertDetail).then(() => {
        success(res, result, 'Insert history success')
      }).catch((err) => {
        failed(res, [], err.message)
      })
    })
    .catch((err) => {
      failed(res, [], err.message)
    })
  },
  update: (req, res) => {
    const invoices = req.params.invoices
    const body = req.body
    productsModel.update(body, invoices)
    .then((result) => {
      success(res, result, 'Update history success')
    })
    .catch((err) => {
      failed(res, [], err.message)
    })
  },
  destroy: (req, res) => {
    const id = req.params.id
    productsModel.destroy(id)
    .then((result) => {
      success(res, result, 'Delete history success')
    })
    .catch((err) => {
      failed(res, [], err.message)
    })
  }
}

module.exports = products