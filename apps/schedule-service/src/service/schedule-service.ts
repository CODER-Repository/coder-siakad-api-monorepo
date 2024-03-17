import { dbContext, getScheduleByNim, getScheduleList, getScheduleListToday } from '@siakad/express.database';
import { CurrentSchedule, Status } from '../interface/schedule-interface';
import { Logger, contextLogger, Day } from '@siakad/express.utils';

export class ScheduleService {
  static async getCurrentSchedule(nim: string): Promise<CurrentSchedule> {
    try {
      const schedules = await dbContext.Schedule().findBy({ nim: nim });
      const result: CurrentSchedule = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      };

      // TODO USING JOIN RELATION
      // const schedulesWithNim = await getScheduleByNim(nim);
      // if (!schedulesWithNim || schedulesWithNim.length === 0) {
      //   return result;
      // }

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
          // room: schedule.room,
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

  static async getTodaySchedule(nim: string): Promise<any> {
    try {
      const now = new Date();
      const today: Day = new Date()
        .toLocaleString('en-US', { weekday: 'long' })
        .toLocaleLowerCase() as Day;
    

      // TODO GET BY NIM/LECTURER_ID
      const schedules = await getScheduleListToday(today, nim)
      // const schedules = await dbContext.Schedule().find({ where: { type: today } });
  
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
          course_name: schedule.course.course_name,
          room: schedule.course.classroom.classroom_name,
          faculty: schedule.course.classroom.faculty,
          time_start: schedule.start_time,
          time_end: schedule.end_time,
          status: status,
        };
      });

      return todaySchedule;
    } catch (error) {
      Logger.error(`Error: ${error.message}`);
      throw error;
    }
  }

  static async getScheduleList(nim: string): Promise<any> {
    try {

      // TODO GET BY NIM/LECTURER_ID
      const schedules = await getScheduleList(nim)
      const listSchedule = schedules.map((schedule) => ({
        schedule_id: schedule.schedule_id,
        course_id: schedule.course_id,
        course_name: schedule.course.course_name,
        course_room: schedule.course.classroom.classroom_name,
        faculty: schedule.course.classroom.faculty,
        time_start: schedule.start_time,
        time_end: schedule.end_time
      }));

      return listSchedule;
    } catch (error) {
      Logger.error(`Error: ${error.message}`);
      throw error;
    }
  }
}
