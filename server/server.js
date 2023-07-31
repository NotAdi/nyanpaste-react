const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./configs/db');

const { authRouter, pasteRouter } = require('./routes');
const errorHandler = require('./middleware/errorHandler.middleware');

console.log('Starting server as ' + process.env.NODE_ENV + ' mode');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());

// MongoDB connection

app.use('/api/auth', authRouter);
app.use('/api/paste', pasteRouter);

app.use(errorHandler);
console.log(path.join(__dirname, '../client/dist'));

// Serve static files if in production mode
// if (process.env.NODE_ENV === 'production') {
// Set static folder
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
});
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await db();
    console.log(
        `Server is running on PORT: ${PORT} url on mode ${process.env.NODE_ENV}`
    );
});

// <---------------------------------------- Handle unhandled Promise rejections -------------------------------------->
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log(err);
    server.close(() => {
        console.log('Server closed due to unhandled promise rejection');
        process.exit(1);
    });
});
