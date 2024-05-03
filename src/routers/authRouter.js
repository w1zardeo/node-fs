const express = require('express');
const { asyncWrapper } = require('../helpers/apiHelpers');
const { registerUserController, loginUserController } = require('../controllers/authController');
const { validate } = require('../middlewares/validation');
const { schemaCreateUser, schemaCredentialsUser } = require('../middlewares/userValidation');
const userController = require('../controllers/userController');
const { authGuard } = require('../middlewares/authGuard');
const router = express.Router();

router.post('/register', validate(schemaCreateUser), asyncWrapper(registerUserController));
router.post('/login', validate(schemaCredentialsUser), asyncWrapper(loginUserController));
router.get('/me', (authGuard, userController.getMe));

module.exports = router;