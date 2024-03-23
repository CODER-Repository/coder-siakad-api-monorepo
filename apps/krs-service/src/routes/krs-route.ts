import { Router } from 'express';
import { KRSController } from '../controllers/krs-controller';
import { AuthContext } from '@siakad/express.server';

const authRouter = Router();

authRouter.route('/').get(AuthContext, KRSController.showKRS);

export default authRouter;
