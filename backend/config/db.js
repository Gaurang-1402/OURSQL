import mysql from 'mysql2';
import dotenv from 'dotenv';

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
        console.log(`Connected to the MySQL database, ${process.env.DB_NAME}.`);
    })
    .catch((error) => {
        console.error("Error connecting to the MySQL database:", error);
        // Handle error appropriately (e.g., retry connection, exit process, etc.)
    });


export default db;
