const productsModel = require('../models/products.js')
const { success, failed } = require('../helpers/response')


const products = {
  getAll: (req, res) => {
    const productName = !req.query.name ? '' : req.query.name
    const sorttypes = req.query.typesort==='desc' ? 'DESC' : 'ASC'
    const limit = req.query.limit? parseInt(req.query.limit) : 3
    const page = req.query.page? parseInt(req.query.page) : 1
    const offset = page === 1 ? 0 : (page-1)*limit
    let order = req.query.orderby
    if (order === 'price'){
      order = 'product_price'
    }else if(order === 'name'){
      order = 'product_name'
    }else if(order === 'category'){
      order = 'category_name'
    }else{
      order = 'date'
    }
    productsModel.getAll(productName, sorttypes, limit, offset, order)
    .then((result) => {
      success(res, result, 'Get all Product success')
    })
    .catch((err) => {
      failed(res, [], err.message)
    })
  },
  getDetail: (req, res) => {
    const id = req.params.id_product
    productsModel.getDetail(id)
    .then((result) => {
      success(res, result, 'Get detail Product success')
    })
    .catch((err) => {
      failed(res, [], err.message)
    })
  },
  insert: (req, res) => {
    const body = req.body
    body.image = req.file.filename
    // console.log(body)
    productsModel.insert(body)
    .then((result) => {
      success(res, result, 'Insert product success')
    })
    .catch((err) => {
      failed(res, [], err.message)
    })
  },
  update: (req, res) => {
    const id = req.params.id_product
    const body = req.body
    body.image = req.file.filename
    productsModel.update(body, id)
    .then((result) => {
      success(res, result, 'Update products success')
    })
    .catch((err) => {
      failed(res, [], err.message)
    })
  },
  destroy: (req, res) => {
    const id = req.params.id
    productsModel.destroy(id)
    .then((result) => {
      success(res, result, 'Delete product success')
    })
    .catch((err) => {
      failed(res, [], err.message)
    })
  },
  updateDetail: (req, res) => {
    const id = req.params.id;
    const data = req.body
    data.image = !req.file ? '': req.file.filename
    console.log(data)
    // console.log(data.image)
    productsModel.updateDetail(data, id)
        .then(result => {
            success(res, result, 'Update data success');
        }).catch(err => {
            failed(res, [], err.message);
        })
}
}

module.exports = products