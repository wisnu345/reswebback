const express = require('express')
const productsController = require('../controllers/products.js')
const categoriesController = require('../controllers/category')
const historiesController = require('../controllers/history.js')

const upload = require('../helpers/upload')

const router = express.Router()

router
  .get('/getall', productsController.getAll)
  .get('/getdetail/:id_product', productsController.getDetail)
  .post('/insert', upload.single('image'),productsController.insert)
  .put('/update/:id_product',upload.single('image'), productsController.update)
  .patch('/updatedetail/:id',upload.single('image'), productsController.updateDetail)
  .delete('/delete/:id', productsController.destroy)

  .get('/getallcategory', categoriesController.getAll)
  .post('/insertcategory', categoriesController.insert)
  .put('/updatecategory/:id', categoriesController.update)
  .delete('/deletecategory/:id', categoriesController.destroy)

  .get('/getallhistory', historiesController.getAll)
  .post('/inserthistory',historiesController.insert)
  .put('/updatehistory/:invoices', historiesController.update)
  .delete('/deletehistory/:invoices', historiesController.destroy)

module.exports = router
