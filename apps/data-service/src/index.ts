import dotenv from 'dotenv';

dotenv.config();

import boom from 'express-boom';
import express, { Express } from 'express';
import { HttpLogger, Logger, PORT_SERVICE } from '@siakad/express.utils';
import { DatabaseConnection } from '@siakad/express.database';

import { routes } from './routes';

const app: Express = express();
const port = process.env.PORT || PORT_SERVICE.dataService;

// Middleware
app.use(boom());
app.use(HttpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes.forEach(route => {
    app.use(route.path, route.router);
});

app.listen(port, async (): Promise<void> => {
    try {
        await DatabaseConnection();
        Logger.info(`[Data-Service] Server is running on port ${port}`);
    } catch (error) {
        Logger.error(
            `Error starting server: Message: ${error.message} | Stack: ${error.stack}`
        );
    }
});
