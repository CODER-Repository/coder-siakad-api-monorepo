import { Classroom, dbContext } from '@siakad/express.database';
import { Logger, queryInterface, buildWhereCondition, contextLogger } from '@siakad/express.utils';
import { CreateClassroomDto, toCreateClassroomDto } from '../interface/classroom-dto';
import { CreateDTO, DTO } from '../utils/queryParams';

export class ClassroomService {
    static async getListClassroom(query: queryInterface): Promise<DTO> {
        try {
            const { limit, offset, where } = query;
            const { condition, parameters } = buildWhereCondition(where)

            // MAKE QUERY
            const queryBuilder = dbContext
                .Classroom()
                .createQueryBuilder('classroom')
                .innerJoinAndSelect('classroom.course', 'course')
                .innerJoinAndSelect('classroom.faculty', 'faculty')
                .orderBy('classroom.classroom_id', 'ASC')
                .where(condition, parameters)
                .skip(offset)
                .take(limit);

            // GET DATA AND COUNT
            const classrooms = await queryBuilder.getMany();
            const totalCount = await queryBuilder.getCount();
            const totalPages = Math.ceil(totalCount / limit);

            // RETRIVED DATA & PAGINATION
            const listClassroom = classrooms.map((classroom: Classroom) => toCreateClassroomDto(classroom));
            const pagination = {
                totalCount,
                totalPage: totalPages,
                page: Math.floor(offset / limit) + 1,
                size: limit
            };

            return {
                data: listClassroom,
                pagination
            };

        } catch (error) {
            Logger.error(`Error: ${error.message}`);
            throw error;
        }
    }

    static async patchClassroomByID(payload: CreateClassroomDto): Promise<CreateDTO> {
        const { id, classroom, facultyId, facultyName, courseId, courseName} = payload;

        // COURSE ENTITY
        const updateData = {
            classroom_id:id,
            classroom_name: classroom,
            faculty_id: facultyId,
            // faculty_name: facultyName,
            // course_id: courseId,
            // course_name: courseName
        };

        const condition = { classroom_id: id };

        try {
            await dbContext.Course()
                .createQueryBuilder('classroom')
                .update(Classroom)
                .set(updateData)
                .where(condition)
                .execute();

            // Find existing course
            const existingCourse = await dbContext.Classroom().findOne({ where: { classroom_id: id } });
            if (!existingCourse) {
                Logger.info(`${contextLogger.patchClassroomService} | classroom not found`);
                return { data: [] };
            }

            Logger.info(`${contextLogger.patchClassroomService} | classroom updated successfully`);
            return { data: existingCourse };

        } catch (error) {
            Logger.error(`${contextLogger.patchClassroomService} | Error: ${error.message}`);
            return { data: [] };
        }
    }

    static async deleteClassroomByID(id: string): Promise<CreateDTO> {
        try {
            const existingCourse = await dbContext.Classroom().findOne({ where: { classroom_id: id } });
            if (!existingCourse) {
                Logger.info(`${contextLogger.deleteClassroomService} | Classroom not found`);
                return { data: [] };
            }

            const deleteResult = await dbContext
                .Classroom()
                .createQueryBuilder('classroom')
                .delete()
                .where('classroom.classroom_id = :classroom_id', { id })
                .execute();
    
            Logger.info(`${contextLogger.deleteClassroomService} | Classroom deleted successfully`);
            return { data: deleteResult };
        } catch (error) {
            Logger.error(
                `${contextLogger.deleteClassroomService} | Error: ${error.message}`
            );
            throw error;
        }
    }
}
