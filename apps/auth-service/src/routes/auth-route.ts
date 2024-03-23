import { Router } from 'express';
import { AuthController } from '../controllers/auth-controller';
import { LoginSchema, RegisterSchema } from './schema/auth-validation';
import { ValidationHandler, AuthContext } from '@siakad/express.server';

const authRouter = Router();

authRouter.route('/register').post(
  // uncomment this on production
  // AuthContext,
  RegisterSchema,
  ValidationHandler,
  AuthController.registerUser
);

authRouter
  .route('/login')
  .post(LoginSchema, ValidationHandler, AuthController.login);

export default authRouter;
