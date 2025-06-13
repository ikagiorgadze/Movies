const Movie = require('../models/movie.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }).select('+password');

        if (!user || password !== user.password) {
            return res.status(401).json('Invalid username or password');
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const signup = async (req, res) => {
    try {
        const { username } = req.body;
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(409).json('Username already exists');
        }

        const newUser = await User.create(req.body);

        const token = jwt.sign(
            { id: newUser._id, username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).json({ token: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserMovies = async (req, res) => {
    try {
        const { movieCollection } = await User.findById(req.user.id).populate(
            'movieCollection'
        );

        res.status(200).json({ movieCollection });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addMovieToUser = async (req, res) => {
    try {
        const { movieId } = req.params;
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res
                .status(404)
                .json(`Movie with id: ${movieId} could not be found`);
        }

        const user = req.user;
        if (user.movieCollection.includes(movieId)) {
            return res
                .status(409)
                .json(
                    `Movie with id: ${movieId} is already in the user collection`
                );
        }

        user.movieCollection.push(movie);
        await user.save({ validateBeforeSave: false });

        return res.status(200).json('Movie added to user collection');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserData = async (req, res) => {
    res.status(200).json(req.user);
};

module.exports = {
    login,
    signup,
    getUserMovies,
    addMovieToUser,
    getUserData
};
