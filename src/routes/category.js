const express = require('express')
const categoriesController = require('../controllers/category')
const { authentication,authorization} = require('../helpers/auth')
const redis = require('../helpers/redis')

const router = express.Router()

router

  .get('/getall',  authentication , authorization,redis.getallRedisCategory,categoriesController.getAll)
  .post('/insert',  authentication, authorization, categoriesController.insert)
  .put('/update/:id',  authentication, authorization, categoriesController.update)
  .delete('/delete/:id',  authentication,authorization, categoriesController.destroy)

module.exports = router
