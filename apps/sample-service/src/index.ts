import express, { Express, Request, Response } from 'express';
// This all come from shared packages inside the folder packages in root dir
import { Logger, HttpLogger } from '@siakad/express.lib-shared';

const app: Express = express();
const port = 5000;

app.use(HttpLogger);

app.get('/', (req: Request, res: Response): void => {
    res.json({ message: 'Hello' });
});

app.listen(port, () => {
    Logger.info(`Server is running at http://localhost:${port}`);
});
