const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Movie = require('../models/movieModel');

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
    const user = await getUsersById(id);
    if (!user) {
        return next({
            status: statusCode.NOT_FOUND,
            message: 'Not found'
        })
    }
    res.status(statusCode.OK).json(user)
}
  
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ status: 'fail', message: 'Token is required' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next(); 
    } catch (error) {
      return res.status(401).json({ status: 'fail', message: 'Invalid token' });
    }
  };

  const getMe = async (req, res) => {
    try {
      const userId = req.user.id;
      const currentUser = await User.findById(userId);
  
      if (!currentUser) {
        return res.status(404).json({ status: 'fail', message: 'User not found' });
      }
  
      res.json({ status: 'success', data: currentUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  };

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

const addFavoriteMovie = async (req, res) => {
    try {
      const { movieId } = req.params;
      const userId = req.user.id;
  
      // Перевіряємо, чи фільм існує
      const movie = await Movie.findById(movieId);
      if (!movie) {
        return res.status(404).json({ status: 'fail', message: 'Movie not found' });
      }
  
      // Отримуємо користувача
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ status: 'fail', message: 'User not found' });
      }
  
      // Перевіряємо, чи фільм вже є у списку улюблених користувача
      if (user.favoriteMovies.includes(movieId)) {
        return res.status(400).json({ status: 'fail', message: 'Movie already in favorites' });
      }
  
      // Додаємо фільм до списку улюблених
      user.favoriteMovies.push(movieId);
      await user.save();
  
      res.status(201).json({ status: 'success', message: 'Movie added to favorites' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  };

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateOneUser,
    deleteUser,
    getMe,
    authMiddleware,
    addFavoriteMovie
}