import express, { Express } from 'express';
import { HttpLogger, Logger } from '@siakad/express.utils';
import AuthRoutes from './routes/AuthRoutes';

const app: Express = express();
const PORT = 4000;

app.use(express.json());
app.use(HttpLogger);

app.use('/v1', AuthRoutes);

app.listen(PORT, () => {
    Logger.info(`[MockServer] Listening on port: ${PORT}`);
});
