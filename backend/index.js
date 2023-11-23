import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import searchRouter from './routes/searchRoutes.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import colors from 'colors';

// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// 3) ROUTES
app.use('/api/search', searchRouter);
app.use('/api/users', userRouter);



// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello World!');
});



// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`.blue.bold);
});
