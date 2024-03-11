import { Router } from 'express';
import { KRSController } from '../controllers/krs-controller';
import { LoginSchema } from './schema/krs-validation';
import { ValidationHandler, VerifyAuth } from '@siakad/express.server';

const authRouter = Router();

authRouter.route('/').get(ValidationHandler, KRSController.showKRS);

export default authRouter;
