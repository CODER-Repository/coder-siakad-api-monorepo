import { Request, Response } from 'express';

import { BaseResponse } from '@siakad/express.server';
import { Logger } from '@siakad/express.utils';
import { AttendanceService } from '../service/attendance-service';

export class AttendanceController {
    static async showAttendance(req: Request, res: Response) {
        const context = '[AttendanceController.showAttendance]';
        try {
            const studentId = req.user.nim;
            const attendanceData = await AttendanceService.showAttendance(studentId);
            return res.json(
                BaseResponse.successResponse(attendanceData, 'Attendance retrieved successfully')
            );
        } catch (error) {
            Logger.error(`${context} | Error: ${error.message}`);
            return res.boom.badImplementation();
        }
    }
}
