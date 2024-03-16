import { dbContext } from '@siakad/express.database';
import { Logger, contextLogger } from '@siakad/express.utils';

export class ClassService {
    static async getListClass(): Promise<any> {
    try {
      const dataClass = await dbContext.Class().find();

      const listClass = dataClass.map((item) => ({
        class_id: item.class_id,
        course_id: item.course_id,
        classrom: item.classroom_id,
        lecturer: item.lecturer_id
      }));

      return listClass;
    } catch (error) {
      Logger.error(`Error: ${error.message}`);
      throw error;
    }
  }
}
