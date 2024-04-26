const {
    getUsers,
    getUsersById,
    addUser,
    updateUser,
    removeUser
} = require('../services/userService');

const { statusCode } = require('../helpers/constants');

const getAllUsers = async (req, res, next) => {
    const users = await getUsers();
    res.status(statusCode.OK).json(users);
}

const getUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await getUsersById();
    if (!user) {
        return next({
            status: statusCode.NOT_FOUND,
            message: 'Not found'
        })
    }
    res.status(statusCode.OK).json(user)
}

const createUser = async (req, res, next) => {
    const newUser = await addUser(req.body);
    res.status(statusCode.CREATED).json(newUser);
}

const updateOneUser = async (req, res, next) => {
    const { userId } = req.params;
    const user = await getUsersById(userId);

    if (!user ) {
        return next({
            status: statusCode.BAD_REQUEST,
            message: `Not found user with id ${userId}`,
        });
    }
    const updatedUser = await updateUser(userId, req.body);
    res.status(statusCode.OK).json(updatedUser);
}

const deleteUser = async (req, res) => {
    const id = req.params.userId;
    const newUserList = await removeUser(id);
    res.status(statusCode.OK).json(newUserList);
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateOneUser,
    deleteUser
}