require('dotenv').config()

module.exports = {
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DATABASE,
    secretkey: process.env.SECRET_KEY,
    refreshkey: process.env.REFRESH_KEY
}

// console.log(this.password)