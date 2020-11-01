const express = require('express')
const historiesController = require('../controllers/history.js')
const {authentication, authorization} = require('../helpers/auth')


const router = express.Router()

router

  .get('/getall', authentication,authorization,historiesController.getAll)
  .get('/gethistory', authentication,authorization,historiesController.getHistory)
  .post('/insert', authentication,authorization,historiesController.insert)
  .put('/update/:id',  authentication,authorization,historiesController.update)
  .delete('/delete/:id', authentication,authorization, historiesController.destroy)

module.exports = router
