import { dbContext } from '@siakad/express.database';
import { Logger, contextLogger } from '@siakad/express.utils';

export class LecturerService {
    static async getListLecturer(): Promise<any> {
    try {
      const dataClass = await dbContext.Lecturer().find();

      const lectures = dataClass.map((item) => ({
        nip: item.nip,
        name: item.name,
        gender: item.type,
        email: item.email,
        phone: item.phone_number,
      }));

      return lectures;
    } catch (error) {
      Logger.error(`Error: ${error.message}`);
      throw error;
    }
  }
}
