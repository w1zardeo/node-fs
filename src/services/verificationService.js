const { createHmac } = require('node:crypto');
const { Verification } = require('../models/verificationModel');

const createVerificationCode = async (userId) => {
    removeUserVerificationsCode(userId);
    const hashedCode = generateHash(userId);
    const newVerificationCode = new Verification({ code: hashedCode, active: true, userId })
    return newVerificationCode;
};

const generateHash = (userParam) => { 
    const secret = 'abcdef';
    const hashedCode = createHmac('sha256', `${secret}`).update(`${userParam}-${Date.now()}`).digest('hex');
    return hashedCode;
}

const removeUserVerificationsCode = async (userId) => { 
    await Verification.deleteMany({ userId });
}

module.exports = {createVerificationCode, generateHash};