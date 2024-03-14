import { dbContext, Schedule } from '@siakad/express.database';
import { CurrentSchedule } from '../interface/schedule-interface';
import { Logger, contextLogger, Day } from '@siakad/express.utils';

export class ScheduleService {
  static async getCurrentSchedule(classId: string, courseId: string, semesterId: string): Promise<CurrentSchedule> {
    try {
      const schedules = await dbContext.Schedule().find();
      // const faculty = await dbContext.Building().findOne({ _id: semesterId })
      // const room = await dbContext.Building().findOne({ _id: classId })
      // const course = await dbContext.Semester().findOne({ _id: classId })

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
        const day = schedule.type.toLowerCase();
        result[day].push({
          schedule_id: schedule.schedule_id,
          course_id: schedule.course_id,
          class_id: schedule.class_id,
          semester_id: schedule.semester_id,
          time_start: schedule.start_time,
          time_end: schedule.end_time,
          // course_name: schedule.course_name,
          // room : schedule.room,
          // faculty: schedule.faculty,
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
