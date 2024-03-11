import { dbContext } from '@siakad/express.database';
import { CurrentSchedule } from '../interface/schedule-interface';
import { Logger, contextLogger } from '@siakad/express.utils';

export class ScheduleService {
  static async getAllSchedules(): Promise<CurrentSchedule> {
    try {
      const schedules = await dbContext.Schedule().find();

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
          time_start: schedule.start_time,
          time_end: schedule.end_time,
          class_id: schedule.class_id,
          semester_id: schedule.semester_id
        });
      });

      return result;
    } catch (error) {
      Logger.error(`${contextLogger.getAllSchedule} | Error: ${error.message}`);
      throw error;
    }
  }
}
