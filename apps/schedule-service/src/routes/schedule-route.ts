import { Router } from 'express';
import { ScheduleController } from '../controllers/schedule-controller';
import { AuthContext } from '@siakad/express.server';

const scheduleRoute = Router();

scheduleRoute.route('/current').get(AuthContext,ScheduleController.getCurrentSchedule);
scheduleRoute.route('/today').get(AuthContext,ScheduleController.getTodaySchedule);
scheduleRoute.route('/list').get(AuthContext, ScheduleController.getScheduleList);
scheduleRoute.route('/delete').delete(AuthContext,ScheduleController.deleteSchedule);

export default scheduleRoute;
