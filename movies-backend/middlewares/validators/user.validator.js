const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json(error.details);
    }

    next();
};

module.exports.validateUserMiddleware = validate(userSchema);
