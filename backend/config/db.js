
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

// Set up MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_IP_ADDRESS,
    user: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to the MySQL server.');
});

export default db;
