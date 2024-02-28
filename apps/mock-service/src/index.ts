import express, { Express } from 'express';
import { HttpLogger, Logger } from '@siakad/express.utils';
import http from 'http';
import { createTerminus } from '@godaddy/terminus';
import AuthRoutes from './routes/AuthRoutes';
import DashboardRoutes from './routes/DashboardRoutes';
import ScheduleRoute from './routes/ScheduleRoute';

const app: Express = express();
const server = http.createServer(app);

const baseRoute = '/api/v1';
const PORT = 5001;

const terminusOptions = {
    signals: ['SIGINT', 'SIGTERM'],
    healthCheck: () => Promise.resolve(),
    onSignal: async (): Promise<void> => {
        Logger.info('[MockService] Starting graceful shutdown...');
        await server.close();
    },
    onShutdown: async (): Promise<void> => {
        return new Promise<void>((resolve) => {
            Logger.info('[MockService] Shutdown complete');
            resolve();
        });
    },
    timeout: 5000
};

app.use(express.json());
app.use(HttpLogger);

app.use(`${baseRoute}/auth`, AuthRoutes);
app.use(`${baseRoute}/dashboard`, DashboardRoutes);
app.use(`${baseRoute}/schedule`, ScheduleRoute);

createTerminus(server, terminusOptions);
server.listen(PORT, () => {
    Logger.info(`[MockServer] Listening on port: ${PORT}`);
});
