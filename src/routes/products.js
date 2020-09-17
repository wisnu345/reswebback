const express = require('express')
const productsController = require('../controllers/products.js')
const auth = require('../helpers/auth')
const redis = require('../helpers/redis')

const router = express.Router()

router
  .get('/getall',auth.authentication,auth.authorization, redis.getallRedis, productsController.getAll)
  .get('/getdetail/:id_product',auth.authentication,auth.authorization, productsController.getDetail)
  .post('/insert',auth.authentication,auth.authorization,productsController.insert)
  .put('/update/:id_product',auth.authentication,auth.authorization, productsController.update)
  .patch('/updatedetail/:id',auth.authentication,auth.authorization, productsController.updateDetail)
  .delete('/delete/:id',auth.authentication,auth.authorization, productsController.destroy)


module.exports = router
