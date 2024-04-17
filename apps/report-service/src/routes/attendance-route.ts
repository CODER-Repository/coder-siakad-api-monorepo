import { Router } from 'express';
import { AttendanceController } from '../controllers/attendance-controller';
import { AuthContext } from '@siakad/express.server';

const authRouter = Router();

authRouter.route('/')
    .get( AuthContext, AttendanceController.showAttendance)
    .post( AuthContext, AttendanceController.createAttendance);

export default authRouter;
