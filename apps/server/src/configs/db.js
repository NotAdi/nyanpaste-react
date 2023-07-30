const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

module.exports = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(
            `Database Connected (${conn.connection.name}): ${conn.connection.host}`
        );

        return conn.connection.db;
    } catch (err) {
        console.log(`Error: ${err.message}`);
        console.log(`Database not Connected`);
        process.exit(1);
        // throw new Error("Database not Connected");
    }
};
