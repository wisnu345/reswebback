const db = require('../configs/database')

const products = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT *, history.id AS id FROM history INNER JOIN detailorder ON history.id = detailorder.id_transaction `, (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },insertMaster: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO history (invoice,cashier,  amount) 
      VALUES ('${data.invoice}','${data.cashier}','${data.amount}')`, (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },
  insertDetail: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO detailorder SET ?`, data, (err, result) => {
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
  destroy: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM history WHERE id='${id}'`, (err, result) => {
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