const Movie = require('../models/movie.model');

const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        if (!movie) {
            return res
                .status(404)
                .json(`Movie with id: ${id} could not be found`);
        }

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);

        if (!movie) {
            return res
                .status(404)
                .json(`Movie with id: ${id} could not be found`);
        }

        const updatedMovie = await Movie.findByIdAndUpdate(req.body);
        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByIdAndDelete(id);

        if (!movie) {
            return res
                .status(404)
                .json(`Movie with id: ${id} could not be found`);
        }

        res.status(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
};
