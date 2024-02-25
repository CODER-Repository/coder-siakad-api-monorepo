import express, { Express, Request, Response } from 'express';
// This all come from shared packages inside the folder packages in root dir
import { HttpLogger, Logger } from '@siakad/express.utils';
import { BaseResponse } from '@siakad/express.server';

const app: Express = express();
const port = 5000;

app.use(HttpLogger);

app.get('/', (req: Request, res: Response): Response => {
    const mockResponse = {
        data: [
            {
                id: 1,
                email: 'email@mail.com'
            },
            {
                id: 2,
                email: 'email2@mail.com'
            }
        ],
        message: 'User Fetched Successfully'
    };

    return res.json(
        BaseResponse.successResponse(mockResponse.data, mockResponse.message)
    );
});

app.listen(port, () => {
    Logger.info(`Server is running at http://localhost:${port}`);
});
