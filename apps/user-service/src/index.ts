import dotenv from 'dotenv';

dotenv.config();

import boom from 'express-boom';
import express, { Express } from 'express';
import { HttpLogger, Logger, PORT_SERVICE } from '@siakad/express.utils';
import { DatabaseConnection } from '@siakad/express.database';

import router from './routes/user-route';

const app: Express = express();
const port = process.env.PORT || PORT_SERVICE.userService;

// Middleware
app.use(boom());
app.use(HttpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', router);

app.listen(port, async (): Promise<void> => {
  try {
    await DatabaseConnection();
    Logger.info(`Server is running on port ${port}`);
  } catch (error) {
    Logger.error(
      `Error starting server: Message: ${error.message} | Stack: ${error.stack}`
    );
  }
});
