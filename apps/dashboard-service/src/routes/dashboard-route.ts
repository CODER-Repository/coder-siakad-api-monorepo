import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard-controller';
import { AuthContext } from '@siakad/express.server';
// import { VerifyAuth } from '@siakad/express.server';

const authRouter = Router();

// authRouter.route('/').get(VerifyAuth, DashboardController.showDashboard);
authRouter.route('/').get( AuthContext, DashboardController.showDashboard);

export default authRouter;
