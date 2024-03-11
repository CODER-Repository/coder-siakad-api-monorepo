import express, { Request, Response } from 'express';
import AuthSuccess from '../resource/auth/AuthSuccess.json';
import AuthFailed from '../resource/auth/AuthFailed.json';
import RegisterSuccess from '../resource/auth/RegisterSucces.json';
import { Logger } from '@siakad/express.utils';

const router = express.Router();

const Namespace = 'AuthController';

router.post('/login', (req: Request, res: Response): Response => {
  Logger.info(`[${Namespace}]`, 'Success login');
  return res.json(AuthSuccess.body);
});

router.post('/register', (req: Request, res: Response): Response => {
  Logger.info(`[${Namespace}] Success register`);
  return res.json(RegisterSuccess);
});

export default router;
