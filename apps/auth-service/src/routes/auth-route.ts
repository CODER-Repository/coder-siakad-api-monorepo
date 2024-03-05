import { Router } from 'express';
import { AuthController } from '../controllers/auth-controller';

const authRouter = Router();

authRouter.route('/register').post(AuthController.registerUser);

authRouter.route('/login').post(AuthController.login);

export default authRouter;