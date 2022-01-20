require('dotenv').config();
const _getKeyValue = require('lodash/get');
const { verifyJwtToken } = require('../utils/jwt');

module.exports = {
  accessTokenValidator: async (req, res, next) => {
    try {
      let token = _getKeyValue(req.headers, 'authorization', null);
      if (!token) throw creatError.Unauthorized();

      token = token.split(' ')[1];
      req.payload = await verifyJwtToken({
        token
      });
      next();
    } catch (error) {
      next(error);
    }
  }
};
