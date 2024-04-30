const {
    getMovies,
    getMovieById
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

module.exports = {
    getAllMovies,
    getMovie    
}