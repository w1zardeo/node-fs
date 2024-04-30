const User = require('../models/userModel');

const getUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error;
    }
}

const getUsersById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw error;
    }
}

const addUser = async (body) => {
    try {
        const newUser = await User.create(body);
        return newUser;
    } catch (error) {
        throw error;
    }
}

const updateUser = async (userId, body) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { $set: body}, {new: true});
        return updatedUser;
    } catch (error) {
        throw error
    }
}

const removeUser = async (userId) => {
    try {
        const deleteUser = await User.findByIdAndDelete(userId);
        return deleteUser;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getUsers,
    getUsersById,
    addUser,
    updateUser,
    removeUser
}