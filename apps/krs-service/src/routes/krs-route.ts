import { Router } from 'express';
import { KRSController } from '../controllers/krs-controller';
import { VerifyAuth } from '@siakad/express.server';

const authRouter = Router();

authRouter.route('/').get(VerifyAuth, KRSController.showKRS);

export default authRouter;
