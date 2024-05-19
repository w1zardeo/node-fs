const express = require('express');

const router = express.Router();

const { getAllMovies,
    getMovie,
    addFavouriteMovie,
    getUserFavoriteMovies
} = require('../controllers/movieController');
// const userController = require('../controllers/userController')
const {authGuard} = require('../middlewares/authGuard')

router.get('/', getAllMovies)
router.get('/:id', getMovie)
router.post('/favorites/addToFavourite', authGuard, addFavouriteMovie);
router.get('/favorites/getMovies', authGuard, getUserFavoriteMovies);


module.exports = router;