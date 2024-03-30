import { Course, dbContext } from '@siakad/express.database';
import { Logger, contextLogger, buildWhereCondition, queryInterface } from '@siakad/express.utils';
import { CreateCourseDto, toCreateCoursedTO } from '../interface/course-dto';
import { CreateDTO, DTO } from '../utils/queryParams';
import { queryCourseValidator } from '../utils/queryValidator';

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

    static async patchCourseByID(payload: CreateCourseDto): Promise<CreateDTO> {
        const { id, course, sks, } = payload;

        // COURSE ENTITY
        const updateData = {
            course_id:id,
            course_name: course,
            credit_hours: sks,
        };

        const condition = { course_id: id };

        try {
            await dbContext.Course()
                .createQueryBuilder('course')
                .update(Course)
                .set(updateData)
                .where(condition)
                .execute();

            // Find existing course
            const existingCourse = await dbContext.User().findOne({ where: { user_id: id } });
            if (!existingCourse) {
                Logger.info(`${contextLogger.patchCourseService} | course not found`);
                return { data: [] };
            }

            Logger.info(`${contextLogger.patchCourseService} | course updated successfully`);
            return { data: existingCourse };

        } catch (error) {
            Logger.error(`${contextLogger.patchCourseService} | Error: ${error.message}`);
            return { data: [] };
        }
    }

    static async deleteCourseByID(id: string): Promise<CreateDTO> {
        try {
            const existingCourse = await dbContext.Course().findOne({ where: { course_id: id } });
            if (!existingCourse) {
                Logger.info(`${contextLogger.deleteCourseService} | Course not found`);
                return { data: [] };
            }

            const deleteResult = await dbContext
                .Course()
                .createQueryBuilder('course')
                .delete()
                .where('course.course_id = :course_id', { id })
                .execute();
    
            Logger.info(`${contextLogger.deleteCourseService} | Course deleted successfully`);
            return { data: deleteResult };
        } catch (error) {
            Logger.error(
                `${contextLogger.deleteCourseService} | Error: ${error.message}`
            );
            throw error;
        }
    }
    

}