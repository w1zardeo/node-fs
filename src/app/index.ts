import express from 'express';
import morgan from 'morgan';
import path from 'path';
import userRouter from '../routers/userRouter';
import movieRouter from '../routers/movieRouter';
import authRouter from '../routers/authRouter';
import { statusCode } from '../helpers/constants';
import bodyParser from 'body-parser';

// require('dotenv').config();

const app = express();

app.use(bodyParser.json());

const PORT: number = 3000;

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
app.use((err: any, _: any, res: any, next: any) => {
  err.status = err.status ? err.status : statusCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? 'Internal Server Error' : err.data,
  });
});

export default app;