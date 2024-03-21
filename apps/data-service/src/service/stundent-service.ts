import { Student, dbContext } from '@siakad/express.database';
import { Logger, contextLogger } from '@siakad/express.utils';
import { toCreateLecturerDto } from '../interface/lecturer-dto';
import { toCreateStudentDto } from '../interface/student-dto';

export class StudentService {
    static async getListStudent(query: any): Promise<any> {
    try {
      const { limit, offset, where } = query;

      const students = await dbContext
        .Student()
        .createQueryBuilder('student')
        .where(where)
        .skip(offset)
        .take(limit)
        .getMany();

      return students.map((stundent: Student) => toCreateStudentDto(stundent));

    } catch (error) {
      Logger.error(`Error: ${error.message}`);
      throw error;
    }
  }
}
