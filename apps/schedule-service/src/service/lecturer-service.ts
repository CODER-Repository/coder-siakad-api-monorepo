import { dbContext } from '@siakad/express.database';
import { Logger, contextLogger } from '@siakad/express.utils';

export class LecturerService {
    static async getListLecturer(query: any): Promise<any> {
    try {
      const { limit, offset, where } = query;

      const lectures = await dbContext
        .Lecturer()
        .createQueryBuilder('lecturer')
        .where(where)
        .skip(offset)
        .take(limit)
        .getMany();

      const listLecturer = Array.isArray(lectures) ? lectures.map((item) => ({
        nip: item.nip,
        name: item.name,
        gender: item.type,
        email: item.email,
        phone: item.phone_number,
        course_name: item.class.classroom.classroom_name
      })) : [];

      return listLecturer;
    } catch (error) {
      Logger.error(`Error: ${error.message}`);
      throw error;
    }
  }
}
