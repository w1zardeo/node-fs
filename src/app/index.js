const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

require('dotenv').config();

const userRouter = require('../routers/userRouter');
const { statusCode } = require('../helpers/constants');

app.use(express.json());
app.use(morgan('tiny'));

app.use('/users', userRouter);

// handle not found errors
app.use((_, res) => {
  res.status(statusCode.NOT_FOUND).json({
    status: 'error',
    code: statusCode.NOT_FOUND,
    message: 'Not found',
  });
});

// handle all other errors 
app.use((err, _, res, next) => {
  err.status = err.status ? err.status : statusCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? 'Internal Server Error' : err.data,
  });
});

module.exports = app;