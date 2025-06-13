const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const movieRouter = require('./routes/movie.routes');
const userRouter = require('./routes/user.routes');
const seedDatabase = require('./seeddata');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Configure CORS to allow from any origin
app.use(cors());

// Use routes
app.use('/api/movies', movieRouter);
app.use('/api/users', userRouter);

// Set up environment variables
const PORT = process.env.PORT;
const MONGO_URI =
    process.env.NODE_ENV === 'development'
        ? process.env.MONGO_URI_LOCAL
        : process.env.MONGO_URI_ATLAS;

// Connect to MongoDB and start the server
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to the database');
        seedDatabase();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(() => {
        console.log('Connection failed');
        console.log(process.env.MONGO_URI_ATLAS);
    });
