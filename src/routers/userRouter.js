const express = require('express');

const router = express.Router();

const { getAllUsers,
    getUsers,
    createUser,
    updateOneUser,
    deleteUser,
} = require('../controllers/userController');

const {asyncWrapper} = require('../helpers/apiHelpers');

router.get('/', asyncWrapper(getAllUsers))
router.get('/:id', asyncWrapper(getUsers))
router.post('/', asyncWrapper(createUser))
router.put('/:userId', asyncWrapper(updateOneUser))
router.delete('/:postId', asyncWrapper(deleteUser))

module.exports = router;