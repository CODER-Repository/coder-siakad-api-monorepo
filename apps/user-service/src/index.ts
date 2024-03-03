import express, { Express, Request, Response } from 'express';
// This all come from shared packages inside the folder packages in root dir
import { HttpLogger, Logger } from '@siakad/express.utils';
import { BaseResponse } from '@siakad/express.server';

const app: Express = express();
const port = 5002;

const USER_API_PREFIX = '/user/v1';

app.use(HttpLogger);

app.get('/', (req: Request, res: Response): Response => {
  const mockResponse = {
    data: [],
    message: 'Hello World'
  };

  return res.json(
    BaseResponse.successResponse(mockResponse.data, mockResponse.message)
  );
});

// Edit User
app.put(
  `${USER_API_PREFIX}/:userId`,
  (req: Request, res: Response): Response => {
    const userId = req.params.userId;
    const { usename, email } = req.body;
    const query = `UPDATE user SET username = '${usename}', email = '${email}', WHERE user_id = ${userId}`;

    const mockResponse = {
      data: [],
      message: 'Hello World'
    };

    return res.json(
      BaseResponse.successResponse(mockResponse.data, mockResponse.message)
    );
  }
);

app.listen(port, () => {
  Logger.info(`Server is running at http://localhost:${port}`);
});
