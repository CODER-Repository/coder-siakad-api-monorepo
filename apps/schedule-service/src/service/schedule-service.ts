import { dbContext } from '@siakad/express.database';
import { Schedule } from '@siakad/express.database';
import { Logger } from '@siakad/express.utils';

export class ScheduleService {
  static async getAllSchedules(): Promise<Schedule[]> {
    try {
      const schedules = await dbContext.Schedule().find();
      console.log(schedules);
      return schedules;
    } catch (error) {
      Logger.error(`[ScheduleService.getAllSchedules] Error: ${error.message}`);
      throw error;
    }
  }
}
