import express, { Express, Request, Response } from 'express';
// This all come from shared packages inside the folder packages in root dir
import { HttpLogger, Logger } from '@siakad/express.utils';

const app: Express = express();
const port = 5000;

app.use(HttpLogger);

app.get('/', (req: Request, res: Response): void => {
    res.json({ message: 'Hello' });
});

app.listen(port, () => {
    Logger.info(`Server is running at http://localhost:${port}`);
    console.log('Testing Github Secret');
});
