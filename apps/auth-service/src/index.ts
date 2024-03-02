import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });
import boom from 'express-boom'; // Mengimpor boom


import express, { Express } from 'express';
import { HttpLogger, Logger } from '@siakad/express.utils'; // Mengimpor Logger
import methodOverride from 'method-override';
import { AppDataSource } from './db-connection';

import router from './routes/auth-route';

const app: Express = express();
app.use(boom()); // Menggunakan boom`
const port = process.env.PORT || 5000;

// Middleware
app.use(HttpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/v1', router);

// Initialize Database and Start Server
const startServer = async () => {
    try {
        await AppDataSource.initialize();
        app.listen(port, () => {
            Logger.info(`Server is running on port ${port}`); // Menggunakan Logger.info
        });
    } catch (error) {
        Logger.error('Error connecting to database:', error); // Menggunakan Logger.error
    }
};

startServer();
