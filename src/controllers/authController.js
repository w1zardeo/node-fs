const { statusCode } = require('../helpers/constants');
const { registerUser, loginUser } = require('../services/authService');

const registerUserController = async (req, res) => {
  const body = req.body;
  await registerUser(body);
  res.status(statusCode.CREATED).json({ status: 'success' });
};

const loginUserController = async (req, res) => {
  const body = req.body;
  const token = await loginUser(body);
  res.status(statusCode.OK).json({ status: 'success', token });
};

module.exports = {
  registerUserController,
  loginUserController,
};