import { Router } from 'express';
import { ScheduleController } from '../controllers/schedule-controller';

const scheduleRoute = Router();

scheduleRoute.route('/').get(ScheduleController.getSchedule);

export default scheduleRoute;
