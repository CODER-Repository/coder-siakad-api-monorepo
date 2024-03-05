import express, { Request, Response } from 'express';
import CurrentSchedule from '../resource/schedule/CurrentSchedule.json';
import TodaySchedule from '../resource/schedule/TodaySchedule.json';
import { Logger } from '@siakad/express.utils';

const router = express.Router();

router.get('/', (req: Request, res: Response): Response => {
    const { today } = req.query;
    if (today) {
        Logger.info(`[Schedule] Get Schedule for today`);
        return res.json(TodaySchedule);
    }
    Logger.info('[Schedule] Get Current Schedule');
    return res.json(CurrentSchedule);
});

export default router;
