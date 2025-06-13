const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res
            .status(401)
            .json({ message: 'You are not logged in, log in and try again' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const currentUser = await User.findById(decodedToken.id);

        if (!currentUser) {
            return res.status(401).json({
                message: 'The user associated with this token no longer exists',
            });
        }

        req.user = currentUser;
        next();
    } catch (error) {
        return res.json(401).json({ message: error });
    }
};

module.exports = protect;
