import mysql from 'mysql2';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

// Set up MySQL connection
const dbNonAdmin = mysql.createPool({
    host: process.env.DB_IP_ADDRESS,
    user: process.env.NON_ADMIN_DB_USERNAME,
    password: process.env.NON_ADMIN_DB_PASSWORD,
    database: process.env.DB_NAME
}).promise();

// Attempt to get a connection
dbNonAdmin.getConnection()
    .then(() => {
        console.log(`Non-admin connected to the MySQL database, ${process.env.DB_NAME}.`.yellow.bold);
    })
    .catch((error) => {
        console.error("Error connecting to the MySQL database:".red.bold, error);
        // Handle error appropriately (e.g., retry connection, exit process, etc.)
    });


    // Set up MySQL connection
const dbAdmin = mysql.createPool({
    host: process.env.DB_IP_ADDRESS,
    user: process.env.ADMIN_DB_USERNAME,
    password: process.env.ADMIN_DB_PASSWORD,
    database: process.env.DB_NAME
}).promise();

// Attempt to get a connection
dbAdmin.getConnection()
    .then(() => {
        console.log(`Admin connected to the MySQL database, ${process.env.DB_NAME}.`.yellow.bold);
    })
    .catch((error) => {
        console.error("Error connecting to the MySQL database:".red.bold, error);
        // Handle error appropriately (e.g., retry connection, exit process, etc.)
    });



export {dbAdmin, dbNonAdmin};
