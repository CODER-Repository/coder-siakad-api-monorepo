import { AppDataSource, Student, Attendance, Lecturer } from '@siakad/express.database';
import { Logger } from '@siakad/express.utils';
import { AttendanceDTO } from '../interface/response';
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
    static async createAttendance(attendances: AttendanceDTO[]): Promise<Attendance[] | null> {
        const context = '[AttendanceService.createAttendance]';
        const queryRunner = AppDataSource.createQueryRunner();
    
        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        try {
            const createdAttendances: Attendance[] = [];

            for (const { student_id, lecture_id, date, status } of attendances) {
                const student = await queryRunner.manager.findOneBy(Student, { nim: student_id });
                const lecture = await queryRunner.manager.findOneBy(Lecturer, { nip: lecture_id });
    
                if (!student) {
                    Logger.error(`${context} | Student not found with ID: ${student_id}`);
                    throw new Error(`Student not found with ID: ${student_id}`);
                }

                if (!lecture) {
                    Logger.error(`${context} | Lecture not found with ID: ${lecture_id}`);
                    throw new Error(`Lecture not found with ID: ${lecture_id}`);
                }
    
                const attendance = new Attendance();
                attendance.student_id = student.nim 
                attendance.lecture_id = lecture.nip 
                attendance.date = new Date(date);
                attendance.status = status;

                console.log("=====================================");
                console.log(attendance);
                
                await queryRunner.manager.save(attendance);
                createdAttendances.push(attendance);
            }
    
            await queryRunner.commitTransaction();
            return createdAttendances;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            Logger.error(`${context} | Error: ${error.message}`);
            return null;
        } finally {
            await queryRunner.release();
        }
    }
    

}
