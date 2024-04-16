import { Course, KRS, dbContext } from '@siakad/express.database';
import { Logger, buildWhereCondition, contextLogger, queryInterface } from '@siakad/express.utils';
import { CreateDTO, DTO } from '../utils/queryParams';
import { toCreateKHS } from '../interface/khs-dto';

export class KRSService {
    static async showKRS(): Promise<KRS[]> {
        try {
            return await dbContext.KRS()
                .createQueryBuilder('krs')
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

    static async getListKHS(query: queryInterface): Promise<DTO> {
        try {
            const { limit, offset, where } = query;
            const { condition, parameters } = buildWhereCondition(where);

            // MAKE QUERY
            const queryBuilder = dbContext
            .Course()
            .createQueryBuilder('course')
            .innerJoinAndSelect('course.krs', 'krs', 'krs.course_id = course.course_id')
            .innerJoinAndSelect('krs.semester', 'semester', 'semester.semester_id = krs.semester_id')
            .innerJoinAndSelect('course.schedule', 'schedule', 'schedule.course_id = course.course_id')
            .innerJoinAndSelect('schedule.lecturer', 'lecturer', 'lecturer.nip = schedule.lecturer_id')
            .innerJoinAndSelect('schedule.student', 'student', 'student.nim = schedule.nim')
            .orderBy('krs.semester_id', 'ASC')
            .where(condition, parameters)
            .skip(offset)
            .take(limit)
        
            // GET DATA AND COUNT
            const result = await queryBuilder.getMany();
            const totalCount = await queryBuilder.getCount();
            const totalPages = Math.ceil(totalCount / limit);

            // RETRIVED DATA & PAGINATION
            const listKHS = result.map((item: Course) => toCreateKHS(item));
            const pagination = {
                totalCount,
                totalPage: totalPages,
                page: Math.floor(offset / limit) + 1,
                size: limit
            };

            return { data: listKHS, pagination };

        } catch (error) {
            Logger.error(`${contextLogger.getKHSService} | Error: ${error.message}`);
            throw error;
        }
    }

    static async updateGradeByID(payload: any): Promise<CreateDTO> {
        const { grade, courseID, smesterID, nim } = payload;

        // KRS ENTITY
        const updateData = {
            grade: grade,
            course_id: courseID,
            semester_id: smesterID,
        };

        const condition = {
            course_id: courseID,
            semester_id: smesterID,
            nim: nim,
        };

        // Find existing KHS
        const existingData = await dbContext.KRS().findOne({ where: condition });
        if (!existingData) {
            Logger.info(`${contextLogger.patchKHSGradeService} | data not found`);
            return { data: [] };
        }

        try {
            await dbContext.KRS()
                .createQueryBuilder('krs')
                .update(KRS)
                .set(updateData)
                .where(condition)
                .execute();

            Logger.info(`${contextLogger.patchKHSGradeService} | data updated successfully`);
            return { data: existingData };

        } catch (error) {
            Logger.error(`${contextLogger.patchKHSGradeService} | Error: ${error.message}`);
            return { data: [] };
        }
    }
}
