import { AppDataSource, KRS, Student, Semester, Course, PaymentHistory  } from '@siakad/express.database';
import { Logger } from '@siakad/express.utils';

export class DasboardService {
    static async showDashboard(studentId: string): Promise<any> {
        try {
            const ipkData = await this.calculateIPK(studentId);
            
            const currentSemester = await this.getCurrentSemester(studentId);
            
            const uktData = await this.getUKTData(studentId);
            
            const totalCredits = await this.getTotalCredits(studentId);

            if (totalCredits.total_credits === null) {
                totalCredits.total_credits = 0;
            }

            return {
                current_gpa: ipkData.ipk,
                total_credit_course_taken: totalCredits.total_credits,
                current_semester: currentSemester.current_semester_year,
                unpaid_fees: uktData.total_ukt,
            };
        } catch (error) {
            Logger.error(`[KRSService.showKRS] Error: ${error.message}`);
            throw error;
        }
    }

    static async calculateIPK(studentId: string): Promise<any> {
        try {
            const ipkData = await AppDataSource.createQueryBuilder(KRS, 'krs')
                .select('AVG(grade)', 'ipk')    
                .innerJoin(Student, 'student', 'krs.nim = student.nim')
                .where('student.nim = :studentId', { studentId })
                .getRawOne();

            return ipkData;
        } catch (error) {
            Logger.error(`[KRSService.calculateIPK] Error: ${error.message}`);
            throw error;
        }
    }

    static async getCurrentSemester(studentId: string): Promise<any> {
        try {
            const currentSemester = await AppDataSource.createQueryBuilder(KRS, 'krs')
            .select('MAX(semester.semester_id)', 'current_semester_year')
            .innerJoin(Student, 'student', 'krs.nim = student.nim')
            .innerJoin(Semester, 'semester', 'krs.semester_id = semester.semester_id')
            .where('student.nim = :studentId', { studentId })
            .getRawOne();
        
            return currentSemester;
        } catch (error) {
            Logger.error(`[KRSService.getCurrentSemester] Error: ${error.message}`);
            throw error;
        }
    }

    static async getUKTData(studentId: string): Promise<any> {
        try {
            const uktData = await AppDataSource.createQueryBuilder(PaymentHistory, 'payment_history')
                .select('SUM(payment_history.amount)', 'total_ukt')
                .innerJoin(Student, 'student', 'payment_history.student_nim = student.nim')
                .where('student.nim = :studentId', { studentId })
                .andWhere('payment_history.payment_status = :paymentStatus', { paymentStatus: 'pending' })
                .getRawOne();

            return uktData;
        } catch (error) {
            Logger.error(`[KRSService.getUKTData] Error: ${error.message}`);
            throw error;
        }
    }

    static async getTotalCredits(studentId: string): Promise<any> {
        try {
            const totalCredits = await AppDataSource.createQueryBuilder(KRS, 'krs')
                .select('SUM(course.credit_hours)', 'total_credits')
                .innerJoin(Student, 'student', 'krs.nim = student.nim')
                .innerJoin(Course, 'course', 'krs.course_id = course.course_id')
                .innerJoin(Semester, 'semester', 'krs.semester_id = semester.semester_id')
                .where('student.nim = :studentId', { studentId })
                .andWhere('semester.year = :currentYear', { currentYear: new Date().getFullYear() })
                .getRawOne();

            return totalCredits;
        } catch (error) {
            Logger.error(`[KRSService.getTotalCredits] Error: ${error.message}`);
            throw error;
        }
    }
}
