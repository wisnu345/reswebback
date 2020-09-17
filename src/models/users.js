const db = require('../configs/database')

const products = {
    register: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO users SET ?`, data, (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },
  login: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email = ?`, data.email, (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },
  insertRefreshToken: (token, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET refresh_token='${token}' WHERE id='${id}'`,(err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },
  checkrefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      // console.log(refreshToken)
      db.query(`SELECT * FROM users WHERE refresh_token = '${refreshToken}'`, (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  }
}

module.exports = products