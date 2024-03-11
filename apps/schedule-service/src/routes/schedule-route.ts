import { Router } from 'express';
import { ScheduleController } from '../controllers/schedule-controller';

const scheduleRoute = Router();

scheduleRoute.route('/current').get(ScheduleController.getCurrentSchedule);
scheduleRoute.route('/today').get(ScheduleController.getTodaySchedule);

export default scheduleRoute;
