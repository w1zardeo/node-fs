const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

const { getAllUsers,
    getUser,
    createUser,
    updateOneUser,
    deleteUser,
} = require('../controllers/userController');

const {asyncWrapper} = require('../helpers/apiHelpers');

const {authGuard} = require('../middlewares/authGuard')

const {uploadAvatarMiddleware} = require('../middlewares/fileUpload');
const {updateUserAvatarController} = require('../controllers/userController');

router.get('/', asyncWrapper(getAllUsers))
router.patch('/avatars', authGuard, uploadAvatarMiddleware.single('avatar'), asyncWrapper(updateUserAvatarController));
router.get('/:id', asyncWrapper(getUser))
router.post('/', asyncWrapper(createUser))
router.patch('/:userId', asyncWrapper(updateOneUser))
router.delete('/:userId', asyncWrapper(deleteUser))


// router.post('/favorites/add/:movieId', userController.addFavoriteMovie);

module.exports = router;