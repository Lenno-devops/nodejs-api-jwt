const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
require('dotenv').config();

//inital express
const express = require('express');
const app = express();

// setup middlewares for parsing
app.use(express.json());

// setup routes
app.use('/', authRoutes);
app.use('/user', userRoutes);

// error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});
app.listen(process.env.PORT || 3000, () => {
  console.log('server is running!', process.env.PORT || 3000);
});

process.on('SIGINT', async () => {
  process.exit(1);
});
