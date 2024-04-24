import { dbContext } from '@siakad/express.database';
import { CurrentSchedule, Status } from '../interface/schedule-interface';
import { Logger, contextLogger, Day, queryInterface, buildWhereCondition } from '@siakad/express.utils';
import { CreateDTO, DTO } from '../utils/queryParams';

export class ScheduleService {
    static async getCurrentSchedule(nim: string): Promise<CurrentSchedule> {
        try {
            const schedules = await dbContext.Schedule()
                .createQueryBuilder('schedule')
                .innerJoinAndSelect('schedule.course', 'course')
                .innerJoinAndSelect('course.classroom', 'classroom')
                .innerJoinAndSelect('classroom.faculty', 'faculty')
                .where('schedule.nim = :nim', { nim: nim })
                .select([
                    'schedule.schedule_id AS schedule_id',
                    'schedule.course_id AS course_id',
                    'schedule.class_id AS class_id',
                    'schedule.semester_id AS semester_id',
                    'schedule.start_time AS start_time',
                    'schedule.end_time AS end_time',
                    'course.course_name AS course_name',
                    'classroom.classroom_name AS room',
                    'faculty.faculty_name AS faculty',
                    'schedule.day AS day'
                ])
                .getRawMany();

            const result: CurrentSchedule = {
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
                sunday: []
            };

            schedules.forEach((schedule) => {
                const day = schedule.day.toLowerCase();
                result[day].push({
                    schedule_id: schedule.schedule_id,
                    course_id: schedule.course_id,
                    class_id: schedule.class_id,
                    semester_id: schedule.semester_id,
                    course_name: schedule.course_name,
                    room: schedule.room,
                    faculty: schedule.faculty,
                    time_start: schedule.start_time,
                    time_end: schedule.end_time,
                });
            });

            return result;
        } catch (error) {
            Logger.error(
                `${contextLogger.getCurrentScheduleService} | Error: ${error.message}`
            );
            throw error;
        }
    }

    static async getTodaySchedule(nim: string): Promise<Object | Error> {
        try {
            const now = new Date();
            const today: Day = new Date()
                .toLocaleString('en-US', { weekday: 'long' })
                .toLocaleLowerCase() as Day;


            const schedules = await dbContext.Schedule()
                .createQueryBuilder('schedule')
                .innerJoin('schedule.student', 'student', 'schedule.nim = student.nim')
                .innerJoin('schedule.course', 'course', 'schedule.course_id = course.course_id')
                .innerJoin('schedule.lecturer', 'lecturer', 'schedule.lecturer_id = lecturer.nip')
                .innerJoin('course.classroom', 'classroom', 'course.classroom_id = classroom.classroom_id')
                .innerJoin('classroom.faculty', 'faculty', 'classroom.faculty_id = faculty.faculty_id')
                .select([
                    'schedule.schedule_id AS schedule_id',
                    'schedule.class_id AS class_id',
                    'classroom.classroom_id AS classroom_id',
                    'schedule.course_id AS course_id',
                    'classroom.classroom_name AS classroom_name',
                    'course.course_name AS course_name',
                    'lecturer.name AS lecturer',
                    'schedule.start_time AS start_time',
                    'schedule.end_time AS end_time',
                    'faculty.faculty_name AS faculty',
                ])
                .where('schedule.nim = :nim', { nim: nim })
                .andWhere('schedule.day = :day', { day: today })
                .getRawMany();

            const todaySchedule = schedules.map((schedule) => {
                const startTime = new Date(schedule.start_time);
                const endTime = new Date(schedule.end_time);
                let status: Status = Status.onGoing;

                if (now >= startTime && now <= endTime) {
                    status = Status.inProgress;
                } else if (now > endTime) {
                    status = Status.finished;
                }

                // TODO create DTO Today Schedule
                return {
                    schedule_id: schedule.schedule_id,
                    class_id: schedule.class_id,
                    classroom_id: schedule.classroom_id,
                    course_id: schedule.course_id,
                    classroom_name: schedule.classroom_name,
                    course_name: schedule.course_name,
                    lecturer: schedule.lecturer,
                    time_start: schedule.start_time,
                    time_end: schedule.end_time,
                    status: status,
                    faculty: schedule.faculty,
                };
            });

            return todaySchedule;
        } catch (error) {
            Logger.error(`Error: ${error.message}`);
            throw error;
        }
    }

    static async getScheduleList(query: queryInterface): Promise<DTO> {
        try {

            const { limit, offset, where } = query;
            const { condition, parameters } = buildWhereCondition(where);

            const queryBuilder = dbContext.Schedule()
                .createQueryBuilder('schedule')
                .innerJoin('schedule.student', 'student', 'schedule.nim = student.nim')
                .innerJoin('schedule.course', 'course', 'schedule.course_id = course.course_id')
                .innerJoin('schedule.lecturer', 'lecturer', 'schedule.lecturer_id = lecturer.nip')
                .innerJoin('course.classroom', 'classroom', 'course.classroom_id = classroom.classroom_id')
                .innerJoin('classroom.faculty', 'faculty', 'classroom.faculty_id = faculty.faculty_id')
                .select([
                    'schedule.schedule_id AS schedule_id',
                    'schedule.class_id AS class_id',
                    'classroom.classroom_id AS classroom_id',
                    'schedule.course_id AS course_id',
                    'classroom.classroom_name AS classroom_name',
                    'course.course_name AS course_name',
                    'lecturer.name AS lecturer',
                    'schedule.start_time AS start_time',
                    'schedule.end_time AS end_time',
                    'faculty.faculty_name AS faculty',
                ])
                .where(condition, parameters)
                .skip(offset)
                .take(limit)

            const schedules = await queryBuilder.getRawMany();
            const totalCount = await queryBuilder.getCount();
            const totalPages = Math.ceil(totalCount / limit);
            const pagination = {
                totalCount,
                totalPage: totalPages,
                page: Math.floor(offset / limit) + 1,
                size: limit
            };

            return { data:schedules, pagination };
        } catch (error) {
            Logger.error(`Error: ${error.message}`);
            throw error;
        }
    }

    static async deleteScheduleByID(id: string): Promise<CreateDTO> {
        try {
            const existingSchedule = await dbContext.Schedule().findOne({ where: { schedule_id: id } });
            if (!existingSchedule) {
                Logger.info(`${contextLogger.deleteScheduleService} | Schedule not found`);
                return { data: [] };
            }

            const deleteResult = await dbContext
                .Schedule()
                .createQueryBuilder('schedule')
                .delete()
                .where('schedule.schedule_id = :id', { id })
                .execute();
    
            Logger.info(`${contextLogger.deleteScheduleService} | Schedule deleted successfully`);
            return { data: deleteResult };
        } catch (error) {
            Logger.error(
                `${contextLogger.deleteScheduleService} | Error: ${error.message}`
            );
            throw error;
        }
    }
}
