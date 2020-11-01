const db = require('../configs/database')
const fs = require('fs')


const products = {
  getAll: (name, typesort, limit, offset,order) => {
    console.log(order)
    return new Promise((resolve, reject) => {
      db.query(`SELECT products.id AS product_id, product_name, product_price, category_id, image, category_name, (SELECT COUNT (*) from products) AS count FROM products INNER JOIN category ON products.category_id = category.id WHERE product_name LIKE '%${name}%' ORDER BY product_price ${typesort} LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
          // console.log(result)
        }
      })
    })
  },
  getAllRedis: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT *,products.id AS id FROM products INNER JOIN category ON products.category_id = category.id `, (err, result) => {
        if(err){
          reject(new Error(err))
        }else{
          resolve(result)
          // console.log(result)
        }
      })
    })
  },
  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM products WHERE id='${id}'`, (err, result) => {
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
      db.query(`INSERT INTO products (product_name, product_price, category_id, image) 
      VALUES ('${data.product_name}','${data.product_price}','${data.category_id}','${data.image}')`, (err, result) => {
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
      db.query(`SELECT * FROM products WHERE id=${id}`, (err,result)=>{
        if (err){
          reject(new Error(err))
        }else{
          resolve(new Promise((resolve,reject)=>{
            let imageset = null
            if(!data.image){
              imageset = result[0].image;
            }else{
              imageset = data.image;
              fs.unlink(`src/uploads/${result[0].image}`, err =>{
                if (err) throw err;
                console.log('succes update image')
              })
            }
            db.query(`UPDATE products SET 
                product_name='${data.product_name}', 
                product_price='${data.product_price}', 
                category_id='${data.category_id}',
                image='${imageset}'
                WHERE id='${id}'
              `, (err, resultup) => {
                if(err){
                  reject(new Error(err))
                }else{
                  resolve(resultup)
                }
              })
          }))
        }
      })
    })
  },
  destroy: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM products WHERE id=${id}`, (err,result)=>{
        if (err) {
          reject (new Error)
        } else {
          resolve(new Promise((resolve,reject)=>{
            const imagename = result[0].image
            fs.unlink(`src/uploads/${imagename}`, (err) => {
              if(err) throw err;
              console.log('succes delete image');
            })
              db.query(`DELETE FROM products WHERE id='${id}'`, (err, resultdel) => {
              if(err){
                reject(err)
              }else{
                resolve(resultdel)
              }
            })  
          }))
        }
      })
    })
  },
  updateDetail: (data, id) => {
    return new Promise((resolve, reject) => {
        if(!data.image) {
          // console.log(data)
          // console.log(id)
            db.query(`SELECT * FROM products WHERE id=${id}`, (err, resget) => {
                if(err) {
                    reject(new Error(err));
                }else {
                    resolve(new Promise((resolve, reject) => {
                        data.image = resget[0].image;
                        db.query(`UPDATE products SET ? WHERE id = ?`, [data, id], (err, res) => {
                            if(err) {
                                reject(new Error(err));
                            }else {
                                resolve(res);
                            }
                        })
                    }))
                }
            })
        }else {
            db.query(`SELECT * FROM products WHERE id=${id}`, (err, resget) => {
                if(err) {
                    reject(new Error(err));
                }else {
                    resolve(new Promise((resolve, reject) => {
                        fs.unlink(`src/uploads/${resget[0].image}`, (err) => {
                            if(err) throw err;
                            console.log('Update data success');
                        })
                        db.query(`UPDATE products SET ? WHERE id = ?`, [data, id], (err, res) => {
                            if(err) {
                                reject(new Error(err));
                            }else {
                                resolve(res);
                            }
                        })
                    }))
                }
            })
        }
    })
}
}

module.exports = products