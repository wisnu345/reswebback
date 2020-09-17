const express = require('express')
const usersController = require('../controllers/users.js')

const router = express.Router()

router
  .post('/register', usersController.register)
  .post('/login', usersController.login)
  .post('/refreshtoken', usersController.regenerateToken)

module.exports = router