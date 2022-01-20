const express = require('express');
const router = express.Router();

const { getUser } = require('../controllers/user');
const { accessTokenValidator } = require('../middlewares/auth');
router.use('/info', accessTokenValidator, getUser);

module.exports = router;
