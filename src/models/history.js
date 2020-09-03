const db = require('../configs/database')

const products = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM history`, (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },insert: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO history (cashier, orders, amount) 
      VALUES ('${data.cashier}','${data.orders}','${data.amount}')`, (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },
  update: (data, invoices) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE history SET 
        cashier='${data.cashier}', 
        orders='${data.orders}', 
        amount='${data.amount}'
        WHERE invoices='${invoices}'
      `, (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },
  destroy: (invoices) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM history WHERE invoices='${invoices}'`, (err, result) => {
        if(err){
          reject(err)
        }else{
          resolve(result)
        }
      })
    })
  }
}

module.exports = products