import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();
const port = process.env.PORT;


console.log(process.env.DB_USERNAME);

// Set up MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_IP_ADDRESS, // Replace with your Google Cloud SQL host
    user: process.env.DB_USERNAME,              // Replace with your database username
    password: process.env.PASSWORD,          // Replace with your database password
    database: process.env.DB_NAME           // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to the MySQL server.');
});

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
