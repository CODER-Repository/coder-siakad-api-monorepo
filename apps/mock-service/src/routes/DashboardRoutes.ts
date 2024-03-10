import express, { Request, Response } from 'express';
import DashboardResponse from '../resource/dashboard/Dashboard.json';
import { Logger } from '@siakad/express.utils';
const router = express.Router();

router.get('/', (req: Request, res: Response): Response => {
  Logger.info('[Dashboard] Get Dashboard Data');
  return res.json(DashboardResponse);
});

export default router;
