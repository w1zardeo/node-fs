const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  ConflictException,
  BadRequestException,
} = require('../helpers/exceptions');
const User = require('../models/userModel');

const registerUser = async ({ email, password }) => {
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ConflictException('Email already in use');
  }

  const newUser = new User();
  Object.assign(newUser, {
    email,
    password,
    firstName,
    lastName,
  });
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

module.exports = {
  registerUser,
  loginUser,
};