require('dotenv').config();
const jwt = require('jsonwebtoken');
const creatError = require('http-errors');
const { JsonWebTokenError } = require('jsonwebtoken');
const createHttpError = require('http-errors');

module.exports = {
  /**
   * generate Jwt token with data
   * @param {Object} data to be attached in the Jwt token
   */
  generateJwtToken: (data) => {
    return new Promise((resolve, reject) => {
      const options = { expiresIn: process.env.JWT_EXPIRY };

      jwt.sign(data, process.env.JWT_ACCESS_TOKEN_SECRET, options, (err, token) => {
        if (err) return reject(creatError.InternalServerError());

        resolve(token);
      });
    });
  },
  verifyJwtToken: ({ token }) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
          return reject(createHttpError.NotAcceptable(err.name === 'TokenExpiredError' ? err.message : 'Unauthorized'));
        } else {
          resolve(payload);
        }
      });
    });
  }
};
