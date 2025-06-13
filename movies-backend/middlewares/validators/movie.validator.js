const Joi = require('joi');

const movieSchema = Joi.object({
    title: Joi.string().min(3).max(20).required(),
    director: Joi.string().min(3).max(20).required(),
    releaseYear: Joi.number().optional(),
    description: Joi.string().optional(),
    posterUrl: Joi.string().uri().optional(),
});

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json(error.details);
    }

    next();
};

module.exports.validateMovieMiddleware = validate(movieSchema);
