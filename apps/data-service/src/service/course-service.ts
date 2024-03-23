import { Course, dbContext } from '@siakad/express.database';
import { Logger, contextLogger, buildWhereCondition, queryInterface } from '@siakad/express.utils';
import { toCreateCoursedTO } from '../interface/course-dto';
import { DTO } from '../utils/queryParams';

export class CourseService {
    static async getListCourse(query: queryInterface): Promise<DTO> {
        try {
            const { limit, offset, where } = query;
            const { condition, parameters } = buildWhereCondition(where);

            // MAKE QUERY
            const queryBuilder = dbContext
                .Course()
                .createQueryBuilder('course')
                .orderBy('course.course_id', 'ASC')
                .where(condition, parameters)
                .skip(offset)
                .take(limit)
            
            // GET DATA AND COUNT
            const courses = await queryBuilder.getMany();
            const totalCount = await queryBuilder.getCount();
            const totalPages = Math.ceil(totalCount / limit);

            // RETRIVED DATA & PAGINATION
            const listCourses = courses.map((item: Course) => toCreateCoursedTO(item));
            const pagination = {
                totalCount,
                totalPage: totalPages,
                page: Math.floor(offset / limit) + 1,
                size: limit
            };

            return {
                data: listCourses,
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