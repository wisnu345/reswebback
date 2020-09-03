const mysql = require('mysql2')
const { host,database,user, password } = require('../helpers/env')
const connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
  dateStrings: 'date'
})
module.exports = connection