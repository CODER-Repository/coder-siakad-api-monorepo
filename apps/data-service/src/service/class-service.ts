import { AppDataSource, Class, Classroom, Course, Lecturer, Schedule, dbContext } from '@siakad/express.database';
import { Logger, contextLogger, buildWhereCondition, queryInterface, Day } from '@siakad/express.utils';
import { CreateClassDto, toCreateClassDto } from '../interface/class-dto';
import { CreateDTO, DTO } from '../utils/queryParams';

export class ClassService {
    static async getListClass(query: queryInterface): Promise<DTO> {
        try {
            const { limit, offset, where } = query;
            const { condition, parameters } = buildWhereCondition(where);

            // MAKE QUERY
            const queryBuilder = dbContext
                .Class()
                .createQueryBuilder('class')
                .innerJoinAndSelect('class.course', 'course')
                .innerJoinAndSelect('class.lecturer', 'lecturer')
                .innerJoinAndSelect('class.classroom', 'classroom')
                .innerJoinAndSelect('class.schedule', 'schedule')
                .orderBy('class.class_id', 'ASC')
                .where(condition, parameters)
                .skip(offset)
                .take(limit)

            // GET DATA AND COUNT
            const classes = await queryBuilder.getMany();
            const totalCount = await queryBuilder.getCount();
            const totalPages = Math.ceil(totalCount / limit);

            // RETRIVED DATA & PAGINATION
            const listClass = classes.map((classroom: Class) => toCreateClassDto(classroom));
            const pagination = {
                totalCount,
                totalPage: totalPages,
                page: Math.floor(offset / limit) + 1,
                size: limit
            };

            return {
                data: listClass,
                pagination
            };

        } catch (error) {
            Logger.error(
                `${contextLogger.getClassService} | Error: ${error.message}`
            );
            throw error;
        }
    }

    static async updateDetailClass(payload: CreateClassDto): Promise<CreateDTO> {
        const { id, course, courseId, classroom, classroomId, nip, lecturer, day, scheduleId, startTime, endTime } = payload;
    
        try {
            // Find existing class
            const isDataExist = await Promise.all([
                Class.findOne({ where: { class_id: id } }),
                Course.findOne({ where: { course_id: courseId } }),
                Classroom.findOne({ where: { classroom_id: classroomId } }),
                Schedule.findOne({ where: { schedule_id: scheduleId } })
            ]);
    
            if (!isDataExist.some(data => !data)) {
                Logger.info(`${contextLogger.patchClassService} | Data not found`);
                return { data: [] };
            }
    
            await AppDataSource.transaction(async (transaction) => {
                await transaction.update(
                    Classroom,
                    { classroom_id: classroomId },
                    { classroom_name: classroom }
                );
                await transaction.update(
                    Course,
                    { course_id: courseId },
                    { course_name: course }
                );

                await transaction.update(
                    Lecturer,
                    { nip: nip },
                    { name: lecturer }
                );
                await transaction.update(
                    Schedule,
                    { schedule_id: scheduleId },
                    { type: Day[day], start_time: startTime, end_time: endTime }
                );
        
            });
    
            // Retrieve updated data
            const resultData = await dbContext
                .Class()
                .createQueryBuilder('class')
                .innerJoinAndSelect('class.course', 'course')
                .innerJoinAndSelect('class.lecturer', 'lecturer')
                .innerJoinAndSelect('class.classroom', 'classroom')
                .innerJoinAndSelect('class.schedule', 'schedule')
                .where('class.class_id = :id', { id })
                .getMany();
    

            const classDetail = resultData.map((classEntity: Class) => toCreateClassDto(classEntity));
            return { data: classDetail };
        } catch (error) {
            Logger.error(`${contextLogger.patchClassService} | Error: ${error.message}`);
            return null;
        }
    }

    static async deleteClassByID(id: string): Promise<CreateDTO> {
        try {
            const existingClass = await dbContext.Class().findOne({ where: { class_id: id } });
            if (!existingClass) {
                Logger.info(`${contextLogger.deleteCourseService} | Class not found`);
                return { data: [] };
            }

            const deleteResult = await dbContext
                .Class()
                .createQueryBuilder('class')
                .delete()
                .where('class.class_id = :id', { id })
                .execute();
    
            Logger.info(`${contextLogger.deleteClassService} | Class deleted successfully`);
            return { data: deleteResult };
        } catch (error) {
            Logger.error(
                `${contextLogger.deleteClassService} | Error: ${error.message}`
            );
            throw error;
        }
    }
    
}