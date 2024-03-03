import express, { Express, Request, Response } from 'express';
// This all come from shared packages inside the folder packages in root dir
import { HttpLogger, Logger } from '@siakad/express.utils';
import { BaseResponse } from '@siakad/express.server';
import { dbContext, DatabaseConnection } from '@siakad/express.database';

const app: Express = express();
const port = 5000;

app.use(HttpLogger);

app.get('/', async (req: Request, res: Response): Promise<Response> => {
    // Example to use dbContext
    const users = await dbContext.User().find();
    return res.json(
        BaseResponse.successResponse(users, 'Data user berhasil diambil')
    );
});

app.listen(port, async (): Promise<void> => {
    await DatabaseConnection();
    Logger.info(`Server is running at http://localhost:${port}`);
});
