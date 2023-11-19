import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import searchRouter from './routes/searchRoutes.js';
import detailsRouter from './routes/detailsRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(cors());

express.json();
express.urlencoded({ extended: true })

// Set up MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_IP_ADDRESS,
    user: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME
});

// 3) ROUTES
app.use('/api/details', detailsRouter);
app.use('/api/search', searchRouter);

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
