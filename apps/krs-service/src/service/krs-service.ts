import { AppDataSource, KRS } from '@siakad/express.database';
import { Logger } from '@siakad/express.utils';

export class KRSService {
    static async showKRS(): Promise<KRS[]> {
        try {
            return await AppDataSource.createQueryBuilder(KRS, 'krs')
                .select('krs.krs_id', 'krs_id')
                .addSelect('student.nim')
                .addSelect('course.course_name')
                .addSelect('krs.semester_id')
                .addSelect('krs.grade')
                .innerJoin('student', 'student', 'krs.nim = student.nim')
                .innerJoin(
                    'course',
                    'course',
                    'krs.course_id = course.course_id'
                )
                .getRawMany();
        } catch (error) {
            Logger.error(`[KRSService.showKRS] Error: ${error.message}`);
            throw error;
        }
    }
}
