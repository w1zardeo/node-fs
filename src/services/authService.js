const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  ConflictException,
  BadRequestException,
} = require('../helpers/exceptions');
const User = require('../models/userModel');
const { Verification } = require('../models/verificationModel');

const { createVerificationCode } = require('../services/verificationService');
const { sendVerificationEmail, sendForgotPasswordEmail } = require('./mailingService');
const { generateHash } = require('../services/verificationService');

const registerUser = async ({ firstName, lastName, email, password }) => {
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ConflictException('Email already in use');
  }

  const newUser = new User();
  const newVerificationCode = await createVerificationCode(newUser.id)
  console.log(newVerificationCode);

  Object.assign(newUser, {
    firstName,
    lastName,
    email,
    password
  });

// console.log({email, newVerificationCode});

  await sendVerificationEmail(email, newVerificationCode.code);
  await newVerificationCode.save();
  await newUser.save();
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).exec();
  const isPasswordValid = bcrypt.compare(password, user.password);
  if (!user || !isPasswordValid) {
    throw new BadRequestException('Invalid credentials');
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
  });
  return token;
};

const compareUserPassword = async (user, password) => { 
  const isPasswordValid = bcrypt.compare(password, user.password);
  if (!user || !isPasswordValid || !user.confirmed) {
    throw new BadRequestException('Invalid credentials');
  }
}


const generateToken = (userId, userEmail) => { 
  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;

  const token = jwt.sign({ id: userId, email: userEmail }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
  });
  return token;
}

const verifyUser = async (code) => { 
  const verificationCode = await Verification.findOne({ code, active: true });

  if (!verificationCode) { 
    throw new BadRequestException('Invalid verification code');
  }
  
  const userToVerify = await User.findById(verificationCode.userId);

  if (!userToVerify) { 
    throw new BadRequestException('Invalid verification code');
  }
  await userToVerify.updateOne({ confirmed: true });
  await verificationCode.deleteOne();
  return generateToken(userToVerify.id, userToVerify.email);

}

const sendForgotPassword = async (email) => {
  const hash = generateHash(email);
  const user = await User.findOne({ email });
  user.password = hash;
  await user.save();
  sendForgotPasswordEmail(email, hash);

}

const resetPassword = async ({ email, oldPassword, newPassword }) => {
  const user = await User.findOne({ email });
  await compareUserPassword(user, oldPassword);
  user.password = newPassword;
  await user.save();
  // can be without token sending
  return generateToken(user.id, user.email);
}

module.exports = {
  registerUser,
  loginUser,
  verifyUser,
  generateToken,
  sendForgotPassword,
  resetPassword
};