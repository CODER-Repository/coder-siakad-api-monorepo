import { AppDataSource, Student, Attendance, Lecturer  } from '@siakad/express.database';
import { Logger } from '@siakad/express.utils';
// import { DashboardData, IPKData, CurrentSemesterData, UKTData, TotalCreditsData } from '../interface/response';

export class AttendanceService {

    static async showAttendance(studentId: string): Promise<Object> {
        const context = '[AttendanceService.showAttendance]';
        try {
            const student = await AppDataSource.createQueryBuilder(Student, 'student')
                .where('student.nim = :studentId', { studentId })
                .getOne();

            if (!student) {
                Logger.error(`${context} | Student not found`);
                return null;
            }

            const attendanceData = await AppDataSource.createQueryBuilder(Attendance, 'attendance')
                .select([
                    'attendance.attendance_id',
                    'attendance.date',
                    'attendance.status',
                    'lecture.name as lectureName',
                ])
                .innerJoin(Student, 'student', 'attendance.studentId = student.nim')
                .innerJoin(Lecturer, 'lecture', 'attendance.lecture_id = lecture.nip')
                .where('student.nim = :studentId', { studentId })
                .getRawMany();

            return attendanceData;
        } catch (error) {
            Logger.error(`${context} | Error: ${error.message}`);
            return null;
        }
    }

}
