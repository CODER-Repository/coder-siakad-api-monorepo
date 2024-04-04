import { dbContext } from '@siakad/express.database';
import { CurrentSchedule, Status } from '../interface/schedule-interface';
import { Logger, contextLogger, Day, queryInterface } from '@siakad/express.utils';

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

    static async getTodaySchedule(): Promise<Object | Error> {
        try {
            const now = new Date();
            const today: Day = new Date()
                .toLocaleString('en-US', { weekday: 'long' })
                .toLocaleLowerCase() as Day;


            const schedules = await dbContext.Schedule()
                .createQueryBuilder('schedule')
                .innerJoin('schedule.student', 'student', 'schedule.nim = student.nim')
                .innerJoin('schedule.course', 'course', 'schedule.course_id = course.course_id')
                .innerJoin('course.classroom', 'classroom', 'course.classroom_id = classroom.classroom_id')
                .innerJoin('classroom.faculty', 'faculty', 'classroom.faculty_id = faculty.faculty_id')
                .select([
                    'schedule.schedule_id AS schedule_id',
                    'schedule.course_id AS course_id',
                    'course.course_name AS course_name',
                    'classroom.classroom_name AS classroom',
                    'faculty.faculty_name AS faculty',
                    'schedule.start_time AS time_start',
                    'schedule.end_time AS time_end',
                    'schedule.class_id AS class_id'
                ])
                .where('schedule.day = :day', { day: today })
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

                return {
                    schedule_id: schedule.schedule_id,
                    course_id: schedule.course_id,
                    course_name: schedule.course_name,
                    room: schedule.classroom,
                    faculty: schedule.faculty,
                    time_start: schedule.start_time,
                    time_end: schedule.end_time,
                    status: status
                };
            });

            return todaySchedule;
        } catch (error) {
            Logger.error(`Error: ${error.message}`);
            throw error;
        }
    }

    static async getScheduleList(query: queryInterface): Promise<Object> {
        try {

            const { limit, offset, where } = query;
            const schedules = await dbContext.Schedule()
                .createQueryBuilder('schedule')
                .innerJoin('schedule.student', 'student', 'schedule.nim = student.nim')
                .innerJoin('schedule.course', 'course', 'schedule.course_id = course.course_id')
                .innerJoin('course.classroom', 'classroom', 'course.classroom_id = classroom.classroom_id')
                .innerJoin('classroom.faculty', 'faculty', 'classroom.faculty_id = faculty.faculty_id')
                .select([
                    'schedule.schedule_id AS schedule_id',
                    'schedule.course_id AS course_id',
                    'course.course_name AS course_name',
                    'classroom.classroom_name AS course_room',
                    'faculty.faculty_name AS faculty',
                    'schedule.start_time AS time_start',
                    'schedule.end_time AS time_end',
                    'schedule.class_id AS class_id'
                ])
                .where(where)
                .skip(offset)
                .take(limit)
                .getRawMany();

            return schedules;
        } catch (error) {
            Logger.error(`Error: ${error.message}`);
            throw error;
        }
    }
}
