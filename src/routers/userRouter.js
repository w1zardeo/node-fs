const express = require('express');

const router = express.Router();

const { getAllUsers,
    getUser,
    createUser,
    updateOneUser,
    deleteUser,
} = require('../controllers/userController');

const {asyncWrapper} = require('../helpers/apiHelpers');

router.get('/', asyncWrapper(getAllUsers))
router.get('/:id', asyncWrapper(getUser))
router.post('/', asyncWrapper(createUser))
router.patch('/:userId', asyncWrapper(updateOneUser))
router.delete('/:userId', asyncWrapper(deleteUser))

module.exports = router;