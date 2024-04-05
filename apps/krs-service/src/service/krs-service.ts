import { Course, KRS, dbContext } from '@siakad/express.database';
import { Logger, buildWhereCondition, contextLogger, queryInterface } from '@siakad/express.utils';
import { DTO } from '../utils/queryParams';
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
                .innerJoinAndSelect('krs.nim', 'student', 'student.nim = krs.nim')
                .innerJoinAndSelect('course.class', 'class', 'class.course_id = course.course_id')
                .innerJoinAndSelect('class.lecturer', 'lecturer', 'lecturer.nip = class.lecturer_id')
                .orderBy('krs.semester_id', 'ASC')
                .where(condition, parameters)
                .skip(offset)
                .take(limit)

            // GET DATA AND COUNT
            const courses = await queryBuilder.getMany();
            const totalCount = await queryBuilder.getCount();
            const totalPages = Math.ceil(totalCount / limit);

            // RETRIVED DATA & PAGINATION
            const listKHS = courses.map((item: Course) => toCreateKHS(item));
            const pagination = {
                totalCount,
                totalPage: totalPages,
                page: Math.floor(offset / limit) + 1,
                size: limit
            };

            return {
                data: listKHS,
                pagination
            };

        } catch (error) {
            Logger.error(
                `${contextLogger.getClassService} | Error: ${error.message}`
            );
            throw error;
        }
    }
}
