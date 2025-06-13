const { number } = require('joi');
const mongoose = require('mongoose');

const movieSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please enter a name for the movie'],
        },
        director: {
            type: String,
            required: [true, 'Please enter a name for the director'],
        },
        releaseYear: {
            type: Number,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        posterUrl: {
            type: String,
            trim: true,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
