import { AppDataSource, Classroom, Course, Faculty, dbContext } from '@siakad/express.database';
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
        const { id, classroom, facultyId, facultyName, courseId, courseName } = payload;

        try {
            await AppDataSource.transaction(async (transaction) => {
                const courseUpdate = await transaction.update(
                    Course,
                    { course_id: courseId },
                    { course_name: courseName }
                );
                const classroomUpdate = await transaction.update(
                    Classroom,
                    { classroom_id: id },
                    { classroom_name: classroom }
                );
                const facultyUpdate = await transaction.update(
                    Faculty,
                    { faculty_id: facultyId },
                    { faculty_name: facultyName }
                );
                Promise.all([
                    transaction.save(courseUpdate.raw),
                    transaction.save(classroomUpdate.raw),
                    transaction.save(facultyUpdate.raw)
                ]);
            }
            )


            // MAKE QUERY
            const classrooms = await dbContext
                .Classroom()
                .createQueryBuilder('classroom')
                .innerJoinAndSelect('classroom.course', 'course')
                .innerJoinAndSelect('classroom.faculty', 'faculty')
                .where("classroom.classroom_id = :id", { id: id })
                .andWhere("course.course_id =:courseId", { courseId: courseId })
                .andWhere("faculty.faculty_id =:facultyId", { facultyId: facultyId })
                .getMany();


            // find existingData
            const existingCourse = classrooms.map((classroom: Classroom) => toCreateClassroomDto(classroom));

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
