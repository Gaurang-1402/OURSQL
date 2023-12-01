import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import searchRouter from './routes/searchRoutes.js';
import userRouter from './routes/userRoutes.js';
import deleteRouter from './routes/deleteRoutes.js';
import createRouter from './routes/createRoutes.js';
import updateRouter from './routes/updateRoutes.js';
import cookieParser from 'cookie-parser';
import colors from 'colors';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();
const port = process.env.PORT || 8000;

app.use(morgan('dev'));
const corsOptions = {
    origin: true, // Change this to the origin(s) you want to allow.
    credentials: true, // Indicates that cookies and credentials should be included.
};
app.use(cors(
    corsOptions
));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3) ROUTES
app.use('/api/search', searchRouter);
app.use('/api/users', userRouter);
app.use('/api', deleteRouter);
app.use('/api', createRouter);
app.use('/api', updateRouter);


if (process.env.NODE_ENV === 'production') {
    console.log(path.join(__dirname, '/frontend/build'))
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

else {
    // Define a simple route
    app.get('/', (req, res) => {
        res.send('API is running...');
    });

}

// Start server
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`.blue.bold)
});
