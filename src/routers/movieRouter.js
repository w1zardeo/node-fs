const express = require('express');

const router = express.Router();

const { getAllMovies,
    getMovie
} = require('../controllers/movieController');

router.get('/', getAllMovies)
router.get('/:id', getMovie)

module.exports = router;