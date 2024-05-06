const {
    getMovies,
    getMovieById,
    addToFavourites,
    getFavoriteMovies
} = require('../services/movieService');

const { statusCode } = require('../helpers/constants');

const getAllMovies = async (req, res, next) => {
    const movies = await getMovies();
    res.status(statusCode.OK).json(movies);
}

const getMovie = async (req, res, next) => {
    const { id } = req.params;
    const movie = await getMovieById(id);
    if (!movie) {
        return next({
            status: statusCode.NOT_FOUND,
            message: 'Not found'
        })
    }
    res.status(statusCode.OK).json(movie)
}

const addFavouriteMovie =  async (req, res) => {
    const {email, movieId} = req.body;

    const updatedFavourites = await addToFavourites(email, movieId)
    res.status(statusCode.OK).send(updatedFavourites)
}

const getUserFavoriteMovies = async (req, res) => {
    // try {
        const userId = req.user._id; // Отримуємо userId з авторизованого користувача
        const favoriteMovies = await getFavoriteMovies(userId);
        res.status(200).json({ favoriteMovies });
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
}

module.exports = {
    getAllMovies,
    getMovie,
    addFavouriteMovie,
    getUserFavoriteMovies
}