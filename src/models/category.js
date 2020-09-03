const db = require('../configs/database')

const products = {
  getAll: (name) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM category WHERE category_name LIKE '%${name}%' `, (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },
  insert: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO category (category_name) 
      VALUES ('${data.category_name}')`, (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },
  update: (data, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE category SET 
        category_name='${data.category_name}'
        WHERE id='${id}' 
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
    // console.log(id)
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM category WHERE id='${id}'`, (err, result) => {
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