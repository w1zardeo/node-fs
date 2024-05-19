const {
  getMovies,
  getMovieById,
  addToFavourites,
  getFavoriteMovies,
} = require("../services/movieService");

const { statusCode } = require("../helpers/constants");

const {
  validateSkipAndLimit,
  validateSort,
  validateSortOrder,
} = require("../middlewares/filters");
const Movie = require("../models/movieModel");

// const getAllMovies = async (req, res, next) => {
//     const movies = await getMovies();
//     res.status(statusCode.OK).json(movies);

// }

const getAllMovies = async (req, res) => {
  try {
    const { skip = 0, limit = 10, sort, sortOrder, search } = req.query;

    if (!validateSkipAndLimit(skip, limit)) {
      return res
        .status(400)
        .json({ error: "Invalid skip or limit parameters" });
    }

    if (sort && !validateSort(sort)) {
      return res.status(400).json({ error: "Invalid sort parameter" });
    }

    if (sortOrder && !validateSortOrder(sortOrder)) {
      return res.status(400).json({ error: "Invalid sortOrder parameter" });
    }

    const result = await getMovies({ skip, limit, sort, sortOrder, search });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMovie = async (req, res, next) => {
  const { id } = req.params;
  const movie = await getMovieById(id);
  if (!movie) {
    return next({
      status: statusCode.NOT_FOUND,
      message: "Not found",
    });
  }
  res.status(statusCode.OK).json(movie);
};

const addFavouriteMovie = async (req, res) => {
  const { email, movieId } = req.body;

  const updatedFavourites = await addToFavourites(email, movieId);
  res.status(statusCode.OK).send(updatedFavourites);
};

const getUserFavoriteMovies = async (req, res) => {
  // try {
  const userId = req.user._id; // Отримуємо userId з авторизованого користувача
  const favoriteMovies = await getFavoriteMovies(userId);
  res.status(200).json({ favoriteMovies });
  // } catch (error) {
  //     res.status(500).json({ error: error.message });
  // }
};

const aggregateMovies = async (req, res) => {
  const movies = await Movie.aggregate([
    { $match: { year: { $gt: 1994 } } },
    {
      $group: {
        _id: "$genre",
        movies: { $push: "$$ROOT" },
        averageRating: { $avg: "$rating" },
        totalViews: { $sum: "$views" },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        genre: "$_id",
        movies: 1,
        averageRating: 1,
        totalViews: 1,
        count: 1,
      },
    },
  ]);
  res.json({ movies });
};

module.exports = {
  getAllMovies,
  getMovie,
  addFavouriteMovie,
  getUserFavoriteMovies,
  aggregateMovies,
};
