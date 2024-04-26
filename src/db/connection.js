const mongoose = require('mongoose');

const MONGO_DB_CONNECTION_STRING = process.env.MONGO_ATLAS_CONNECTION_STRING || '';
console.log("1",MONGO_DB_CONNECTION_STRING);
const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_DB_CONNECTION_STRING);
        console.log('Database connection seccesful');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = {connectDb};