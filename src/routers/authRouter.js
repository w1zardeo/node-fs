const express = require('express');
const { asyncWrapper } = require('../helpers/apiHelpers');
const { registerUserController, loginUserController, verifyUserController, forgotPasswordController, resetPasswordController, sendVerificationCodeController  } = require('../controllers/authController');
const { validate } = require('../middlewares/validation');
const { schemaCreateUser, schemaCredentialsUser } = require('../middlewares/userValidation');
const userController = require('../controllers/userController');
const { authGuard } = require('../middlewares/authGuard');
const router = express.Router();

router.post('/register', validate(schemaCreateUser), asyncWrapper(registerUserController));
router.get('/verify/:code', asyncWrapper(verifyUserController));
router.post('/verify', asyncWrapper(sendVerificationCodeController));
router.post('/login', validate(schemaCredentialsUser), asyncWrapper(loginUserController));
router.post('/forgot_password', asyncWrapper(forgotPasswordController));
router.post('/reset_password', asyncWrapper(resetPasswordController));
router.get('/me', authGuard, userController.getMe); 

module.exports = router;