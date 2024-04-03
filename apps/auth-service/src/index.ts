import dotenv from 'dotenv';

dotenv.config();

import boom from 'express-boom';
import http from 'http';
import express, { Express } from 'express';
import { HttpLogger, Logger, PORT_SERVICE } from '@siakad/express.utils';
import { DatabaseConnection, CloseDatabaseConnection } from '@siakad/express.database';
import { createTerminus, TerminusOptions } from '@godaddy/terminus';

import router from './routes/auth-route';

const app: Express = express();
const port = process.env.PORT || PORT_SERVICE.authService;
const server = http.createServer(app);

// Middleware
app.use(boom());
app.use(HttpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/auth', router);

let isShuttingDown = false;

const terminusOptions: TerminusOptions = {
    signals: ['SIGINT', 'SIGTERM'],
    onSignal: async () => {
        if (!isShuttingDown) {
            isShuttingDown = true;
            Logger.info('[Auth-Service] Starting graceful shutdown...');
            await CloseDatabaseConnection();
            server.close(() => {
                Logger.info(
                    '[Auth-Service] Server is no longer accepting connections.'
                );
            });
        }
    },
    onShutdown: async () => {
        await new Promise<void>((resolve) => {
            server.on('close', () => {
                Logger.info('[Auth-Service] Shutdown complete');
                resolve();
            });
        });
    },
    timeout: 5000
};

createTerminus(server, terminusOptions);

server.listen(port, async (): Promise<void> => {
    try {
        await DatabaseConnection();
        Logger.info(`[Auth-Service] Server is running on port ${port}`);
    } catch (error) {
        Logger.error(
            `Error starting server: Message: ${error.message} | Stack: ${error.stack}`
        );
    }
});
