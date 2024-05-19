const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  views: {
    type: Number,
    required: true
  }
});

// Модель для колекції фільмів у базі даних
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;