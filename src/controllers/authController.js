const { statusCode } = require('../helpers/constants');
const { registerUser, loginUser, verifyUser, sendForgotPassword, resetPassword } = require('../services/authService');

const registerUserController = async (req, res) => {
  const body = req.body;
  await registerUser(body);
  res.status(statusCode.CREATED).json({ status: 'success' });
};

const verifyUserController = async (req, res) => {
  const code = req.params.code;
  const token  = await verifyUser(code);
  res.status(statusCode.CREATED).json({ status: 'success', token });
};

const loginUserController = async (req, res) => {
  const body = req.body;
  const token = await loginUser(body);
  res.status(statusCode.OK).json({ status: 'success', token });
};

const forgotPasswordController = async (req, res) => { 
  const { email } = req.body;
  sendForgotPassword(email)
res.status(statusCode.OK).json({status: 'success'})
}

const resetPasswordController = async (req, res) => { 
  const { email, oldPassword, newPassword } = req.body;
  const token = await resetPassword({email, oldPassword, newPassword})
res.status(statusCode.OK).json({status: 'success', token})
}


module.exports = {
  registerUserController,
  loginUserController,
  verifyUserController,
  forgotPasswordController,
  resetPasswordController
};