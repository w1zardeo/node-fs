const path = require('path');
const fs = require('fs/promises');

const User = require('../models/userModel');

const {finalAvatarsFolder} = require('../helpers/constants');

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

const saveUserAvatar = async (file) => {
    const pathName = file.path;
    const newAvatar = file.originalname;
    try {
      await fs.rename(pathName, path.join(`${finalAvatarsFolder}`, newAvatar));
    } catch (error) {
      await fs.unlink(pathName);
      throw error;
    }
    return path.join(process.env.AVATARS_FOLDER, newAvatar).replace('\\', '/');
  };
  
  
  const updateAvatar = async (userId, file) => {
    const avatarURL = await saveUserAvatar(file);
    await User.findByIdAndUpdate(userId, { avatarURL }, { new: true });
    return avatarURL;
  };

module.exports = {
    getUsers,
    getUsersById,
    addUser,
    updateUser,
    removeUser,
    saveUserAvatar,
    updateAvatar
}