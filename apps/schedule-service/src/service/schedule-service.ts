import { dbContext, getScheduleByNim, Schedule } from '@siakad/express.database';
import { CurrentSchedule } from '../interface/schedule-interface';
import { Logger, contextLogger, Day } from '@siakad/express.utils';

export class ScheduleService {
  static async getCurrentSchedule(nim: string): Promise<CurrentSchedule> {
    try {
      // TODO USING JOIN
      // const schedulesWithNim = await getScheduleByNim(nim);
      const schedules = await dbContext.Schedule().find();
      const schedulesWithDetails = [];

      for (const schedule of schedules) {
        const course = await dbContext.Course().findOne({ where: { course_id: schedule.course_id } });
        const room = await dbContext.Classroom().findOne({ where: { classroom_id: course.classroom_id } });
        const faculty = await dbContext.Faculty().findOne({ where: { faculty_id: room.faculty_id } });

        const scheduleWithDetails = {
          schedule_id: schedule.schedule_id,
          course_id: schedule.course_id,
          class_id: schedule.class_id,
          semester_id: schedule.semester_id,
          time_start: schedule.start_time,
          time_end: schedule.end_time,
          course_name: course.course_name,
          room: room.classroom_name,
          faculty: faculty.faculty_name
        };

        schedulesWithDetails.push(scheduleWithDetails);
      }

      const result: CurrentSchedule = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      };

      schedulesWithDetails.forEach((schedule) => {
        const day = schedule.type.toLowerCase();
        result[day].push({
          schedule_id: schedule.schedule_id,
          course_id: schedule.course_id,
          class_id: schedule.class_id,
          semester_id: schedule.semester_id,
          time_start: schedule.start_time,
          time_end: schedule.end_time,
          course_name: schedule.course_name,
          room: schedule.room,
          faculty: schedule.faculty,
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

  static async getTodaySchedule(): Promise<any> {
    try {
      const today: Day = new Date()
        .toLocaleString('en-US', { weekday: 'long' })
        .toLocaleLowerCase() as Day;
      const schedules = await Schedule.find({ where: { type: today } });

      const todaySchedule = schedules.map((schedule) => ({
        schedule_id: schedule.schedule_id,
        course_id: schedule.course_id,
        time_start: schedule.start_time,
        time_end: schedule.end_time
      }));

      return todaySchedule;
    } catch (error) {
      Logger.error(`Error: ${error.message}`);
      throw error;
    }
  }
}
