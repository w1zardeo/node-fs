const express = require('express');
// const app = express();
const path = require('path');

const app = require('./app');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const {connectDb} = require('./db/connection');

// const PORT = process.env.PORT || 3000;
const PORT = 3000

const startServer = async () => {
    try {
        await connectDb();
        app.listen(PORT, (err) => {
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