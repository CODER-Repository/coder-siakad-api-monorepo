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
    static async createAttendance(req: Request, res: Response) {
        const context = '[AttendanceController.createAttendance]';
        try {
            const attendances = req.body;
            if (!Array.isArray(attendances)) {
                return res.boom.badRequest('Invalid input, array of attendance data required');
            }
            console.log(attendances);
            const createdAttendances = await AttendanceService.createAttendance(attendances);
    
            if (createdAttendances && createdAttendances.length) {
                return res.json(
                    BaseResponse.successResponse(createdAttendances, 'Attendance created successfully')
                );
            } else {
                return res.boom.badRequest('No attendance records were created, check input data');
            }
        } catch (error) {
            Logger.error(`${context} | Error: ${error.message}`);
            return res.boom.badImplementation('Failed to create attendance records');
        }
    }
    
}
