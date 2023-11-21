import express from 'express';
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

import chalk from 'chalk';

const coloredMorgan = morgan((tokens, req, res) => {
    return [
        chalk.hex('#ff4757').bold(tokens.method(req, res)),
        chalk.hex('#1e90ff').bold(tokens.url(req, res)),
        chalk.hex('#ff6b81').bold(tokens.status(req, res)),
        chalk.hex('#34ace0').bold(tokens['response-time'](req, res) + ' ms')
    ].join(' ');
});

app.use(coloredMorgan);

express.json();
express.urlencoded({ extended: true })



// 3) ROUTES
app.use('/api/details', detailsRouter);
app.use('/api/search', searchRouter);



// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello World!');
});



// Start server
app.listen(port, () => {
    console.log(chalk.blue(`Server running on port ${port}`));
});
