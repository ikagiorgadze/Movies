const express = require('express');
const router = express.Router();

const {
    login,
    signup,
    getUserMovies,
    addMovieToUser,
    getUserData,
} = require('../controllers/user.controller');
const {
    validateUserMiddleware,
} = require('../middlewares/validators/user.validator');
const protect = require('../middlewares/auth.middleware');

router.get('/login', validateUserMiddleware, login);
router.post('/signup', validateUserMiddleware, signup);

router.get('/me', protect, getUserData);
router.get('/me/movies', protect, getUserMovies);
router.patch('/me/movies/:movieId', protect, addMovieToUser);

module.exports = router;
