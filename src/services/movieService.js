const Movie = require('../models/movieModel');

const getMovies = async () => {
    try {
        const movies = await Movie.find();
        return movies;
    } catch (error) {
        throw error;
    }
}

const getMovieById = async (userId) => {
    try {
        const movie = await Movie.findById(userId);
        return movie;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getMovies,
    getMovieById
}