const { statusCode } = require('../helpers/constants');
const { registerUser, loginUser, verifyUser, sendForgotPassword, resetPassword } = require('../services/authService');

const User = require('../models/userModel');

const {createVerificationCode} = require('../services/verificationService');
const {sendVerificationEmail} = require('../services/mailingService');

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

const sendVerificationCodeController = async (req, res) => {
  const { email } = req.body;

  // Перевірка, чи вказано email у тілі запиту
  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }

  try {
    // Отримання користувача за email
    const user = await User.findOne({ email });

    if(!user) {
      return res.status(400).json({message: 'User not found'})
    }

    // Перевірка, чи користувач вже пройшов верифікацію
    if (user.confirmed) {
      return res.status(400).json({ message: "Verification has already been passed" });
    }

    // Логіка відправки коду верифікації
    const verificationCode = await createVerificationCode(user.id); // Функція для генерації коду
    await verificationCode.save();
    await sendVerificationEmail(email, verificationCode.code); // Функція для відправки email з кодом

    // Збереження коду у базі даних або в іншому місці для подальшої перевірки

    // Відповідь, що лист з кодом верифікації надіслано
    res.status(200).json({ message: "Verification code sent successfully" });
  } catch (error) {
    console.error("Error sending verification code:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  registerUserController,
  loginUserController,
  verifyUserController,
  forgotPasswordController,
  resetPasswordController,
  resetPasswordController,
  sendVerificationCodeController
};