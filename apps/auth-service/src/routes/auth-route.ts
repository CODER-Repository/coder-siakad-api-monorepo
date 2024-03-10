import { Router } from 'express';
import { AuthController } from '../controllers/auth-controller';
import { LoginSchema, RegisterSchema } from './schema/auth-validation';
import { ValidationHandler, VerifyAuth } from '@siakad/express.server';

const authRouter = Router();

authRouter.route('/register').post(
  // uncomment this on production
  // VerifyAuth,
  RegisterSchema,
  ValidationHandler,
  AuthController.registerUser
);

authRouter
  .route('/login')
  .post(LoginSchema, ValidationHandler, AuthController.login);

export default authRouter;
