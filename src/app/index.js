const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const userRouter = require('../routers/userRouter');
const movieRouter = require('../routers/movieRouter');
const authRouter = require('../routers/authRouter');
const { statusCode } = require('../helpers/constants');
const bodyParser = require('body-parser');

require('dotenv').config();

app.use(bodyParser.json());

// const PORT = process.env.PORT || 3000;
// const port = 3000

// app.listen(port, (err) => {
// if (err) {
// console.log(err)
// }
//   console.log(`Server running on port ${port}`) 
// })

app.use(express.json());
app.use(morgan('tiny'));

app.use('/movies', movieRouter)
app.use('/users', userRouter);
app.use('/auth', authRouter);

//handle not found errors
app.use((_, res) => {
  res.status(statusCode.NOT_FOUND).json({
    status: 'error',
    code: statusCode.NOT_FOUND,
    message: 'Not found',
  });
});

//handle all other errors 
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