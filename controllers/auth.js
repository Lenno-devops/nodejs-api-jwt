require('dotenv').config();

const { v4: uuid } = require('uuid');
const creatError = require('http-errors');
const JSONdb = require('simple-json-db');
const db = new JSONdb(process.env.JSON_DB_PATH, { asyncWrite: true });
const { signJwtToken, generateJwtToken } = require('../utils/jwt');

// handles register
module.exports = {
  register: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      // this is just a demo code and not for production
      const uid = uuid();
      db.set(
        email,
        JSON.stringify({
          id: uid,
          username: `Demo username ${uid}`,
          password
        })
      );
      res.status(201);
      res.send(`Account created successfully, id: ${uid}`);
    } catch (error) {
      next(error);
    }
  },
  // handles login
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userData = db.get(email);

      if (!userData) throw creatError.NotFound();

      const { id, username, password: dbPassword } = JSON.parse(userData);

      if (!(id && password === dbPassword)) throw creatError.Unauthorized();

      const token = await generateJwtToken({ id, username, email });
      res.send(token);
    } catch (error) {
      next(error);
    }
  }
};
