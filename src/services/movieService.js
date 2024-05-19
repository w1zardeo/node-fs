const Movie = require('../models/movieModel');
const User = require('../models/userModel');
const { validateSkipAndLimit, validateSort, validateSortOrder } = require('../middlewares/filters');

// const getMovies = async () => {
//     try {
//         const movies = await Movie.find();
//         return movies;
//     } catch (error) {
//         throw error;
//     }
// }

const getMovies = async (queryParams) => {
    const { skip = 0, limit = 10, sort, sortOrder, search } = queryParams;

    if (!validateSkipAndLimit(skip, limit)) {
        throw new Error('Invalid skip or limit parameters');
      }
    
      let sortOptions = {};
      if (sort && sortOrder) {
        if (!validateSort(sort)) {
          throw new Error('Invalid sort parameter');
        }
        if (!validateSortOrder(sortOrder)) {
          throw new Error('Invalid sortOrder parameter');
        }
        sortOptions[sort] = sortOrder === 'desc' ? -1 : 1;
      }

      let searchQuery = {};
  if (search) {
    searchQuery = { name: { $regex: new RegExp(search, 'i') } };
  }

  const totalItems = await Movie.countDocuments(searchQuery);
  const movies = await Movie.find(searchQuery)
    .sort(sortOptions)
    .skip(parseInt(skip))
    .limit(parseInt(limit));

  return { items: movies, meta: { skip, limit, totalItems } };
  
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