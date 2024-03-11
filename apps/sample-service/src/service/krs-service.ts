import { EntityManager, DataSource } from 'typeorm';
import { AppDataSource } from '@siakad/express.database';
import { Logger } from '@siakad/express.utils';
import { dbContext, KRS } from '@siakad/express.database';

export class KRSService {
    static async showKRS(): Promise<KRS[]> {
        try {
            // const krs = await dbContext.KRS().find();

            // const krs = await AppDataSource.transaction(async (transaction: EntityManager) => {
            //     return transaction.query(
            //         `SELECT krs.krs_id, student.nim, course.course_name, krs.semester_id, krs.grade
            //         FROM krs
            //         INNER JOIN student ON krs.nim = student.nim
            //         INNER JOIN course ON krs.course_id = course.course_id`
            //     );
            // });

            // const krs  = await AppDataSource.query(
            //     `SELECT krs.krs_id, student.nim, course.course_name, krs.semester_id, krs.grade
            //     FROM krs
            //     INNER JOIN student ON krs.nim = student.nim
            //     INNER JOIN course ON krs.course_id = course.course_id`
            // );

            const appDataSource = await AppDataSource.initialize();
            const queryRunner = appDataSource.createQueryRunner();
            const krs = await queryRunner.query(
                `SELECT krs.krs_id, student.nim, course.course_name, krs.semester_id, krs.grade
            FROM krs
            INNER JOIN student ON krs.nim = student.nim
            INNER JOIN course ON krs.course_id = course.course_id`
            );
            await queryRunner.release();

            return krs;
        } catch (error) {
            Logger.error(`[KRSService.showKRS] Error: ${error.message}`);
            throw error;
        }
    }
}
