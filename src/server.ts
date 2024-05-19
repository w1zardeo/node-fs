import express from 'express';
import path from 'path';
import app from './app';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path: './.env'});

import {connectDb} from './db/connection';

const PORT: number = 3000;

const startServer = async () => {
    try {
        await connectDb();
        app.listen(PORT, (err: any) => {
            if (err) {
                console.log('Error at server launch', err);
            }
            console.log(`Server running on port ${PORT}`);
        })
    }
    catch (error) {
        console.log(error);
    }
}

startServer();