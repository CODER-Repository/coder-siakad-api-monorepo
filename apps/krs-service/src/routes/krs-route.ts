import { Router } from 'express';
import { KRSController } from '../controllers/krs-controller';
import { AuthContext } from '@siakad/express.server';

const authRouter = Router();

authRouter.route('/listKRS').get(AuthContext,KRSController.showKRS);
authRouter.route('/listKHS').get(AuthContext,KRSController.showKHS);
authRouter.route('/grade').patch(AuthContext,KRSController.patchKHSGrade);

export default authRouter;
