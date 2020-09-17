const jwt = require('jsonwebtoken')
const {tokenResponse, tokenExpired} = require('../helpers/response')

const { secretkey } = require('../helpers/env')

module.exports = {
authentication: (req, res, next) => {
    const token = req.headers.token
    if (token === undefined || token === '') {
        tokenResponse(res, [], 'Authentikasi Gagal, token must filled')
    } else {
        next()
    }
},
authorization: (req, res, next) => {
    const token = req.headers.token
    jwt.verify(token, secretkey, (err, decoded) => {
        if (err) {
            tokenExpired(res, [], 'Authentikasi Gagal, token has expired')
        } else {
            next()
        }
    })
}
}