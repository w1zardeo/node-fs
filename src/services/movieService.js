const Movie = require('../models/movieModel');
const User = require('../models/userModel');

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

const addToFavourites = async (email, movieId) => {
    try {
        const user = await User.findOne({ email });
        const movieToAdd = await getMovieById(movieId);
        
        if (!user || !movieToAdd) {
            throw new Error("User or movie not found.");
        }

        user.favoriteMovies.push(movieToAdd); // Додаємо об'єкт фільму безпосередньо
        await user.save(); // Зберігаємо зміни

        return user.favoriteMovies;
    } catch (error) {
        throw error;
    }
}

const getFavoriteMovies = async (userId) => {
    // try {
        const user = await User.findById(userId).populate('favoriteMovies');
        // if (!user) {
        //     throw new Error("User not found");
        // }
        return user.favoriteMovies;
    // } catch (error) {
    //     throw error;
    // }
}

module.exports = {
    getMovies,
    getMovieById,
    addToFavourites,
    getFavoriteMovies
}