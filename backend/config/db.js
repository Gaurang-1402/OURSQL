import mysql from 'mysql2';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

// Set up MySQL connection
const db = mysql.createPool({
    host: process.env.DB_IP_ADDRESS,
    user: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME
}).promise();

// Attempt to get a connection
db.getConnection()
    .then(() => {
        console.log(`Connected to the MySQL database, ${process.env.DB_NAME}.`.yellow.bold);
    })
    .catch((error) => {
        console.error("Error connecting to the MySQL database:".red.bold, error);
        // Handle error appropriately (e.g., retry connection, exit process, etc.)
    });


export default db;