const express = require('express');
const router = express.Router();

const {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
} = require('../controllers/movie.controller');
const { validateMovieMiddleware } = require('../middlewares/validators/movie.validator');

router.get('/', getAllMovies);

router.get('/:id', getMovieById);

router.post('/', validateMovieMiddleware, addMovie);

router.put('/:id', validateMovieMiddleware, updateMovie);

router.delete('/:id', deleteMovie);

module.exports = router;
