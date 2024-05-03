const express = require('express');
const { asyncWrapper } = require('../helpers/apiHelpers');
const { registerUserController, loginUserController } = require('../controllers/authController');
const { validate } = require('../middlewares/validation');
const { schemaCreateUser, schemaCredentialsUser } = require('../middlewares/userValidation');
const router = express.Router();

router.post('/register', validate(schemaCreateUser), asyncWrapper(registerUserController));
router.post('/login', validate(schemaCredentialsUser), asyncWrapper(loginUserController));

module.exports = router;