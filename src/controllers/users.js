const usersModel = require("../models/users.js");
const { success, failed, tokenResponse } = require("../helpers/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { result } = require("lodash");
const {secretkey, refreshkey} = require('../helpers/env')

const users = {
  register: async (req, res) => {
    const body = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(body.password.toString(), salt);

    const data = {
      email: body.email,
      password: hashPassword,
    };

    usersModel
      .register(data)
      .then((result) => {
        success(res, result, "Insert new user success");
      })
      .catch((err) => {
        failed(res, [], err.message);
      });
  },
  login: async (req, res) => {
    const body = req.body;
    usersModel
      .login(body)
      .then(async (result) => {
        if (result) {
          const data = result[0];
          const isMatch = await bcrypt.compare(body.password, data.password);
          if (isMatch) {
            // console.log(result[0].email)
            jwt.sign(
              {
                email: data.email,
              },
              secretkey,
              { expiresIn: 360 },
              (err, token) => {
                if (err) {
                  console.log(err);
                } else {
                  const fieldRefreshToken = data.refresh_token;
                  if (fieldRefreshToken === null) {
                    const id = data.id;
                    const refreshToken = jwt.sign({ id }, "REFRESH TOKEN");
                    usersModel.insertRefreshToken(refreshToken, id)
                      .then(() => {
                        tokenResponse(
                          res,
                          { token, refreshToken },
                          "Login success"
                        )
                      })
                      .catch((err) => {
                        failed(res, [], err.message);
                      });
                  } else {
                    tokenResponse(res,{ token, refreshToken:fieldRefreshToken },"Login success")
                  }
                }
              }
            );
          } else {
            failed(res, [], "Email/Password salah");
          }
        }
      })
  },
  regenerateToken: async (req, res) => {
    const refreshToken = req.body.refreshToken
    usersModel.checkrefreshToken(refreshToken).then((result)=> {
      if (refreshToken.length >= 1) {
        const user = result[0]
        // console.log(user)
        const newToken = jwt.sign({ email: user.email,},secretkey,{ expiresIn: 36000 })
        tokenResponse(res,{ token : newToken, refreshToken },"Token refresh sucessfully")
      } else {
        failed(res, [], 'Refresh token not found')
      }
    })
  },
};

module.exports = users;
