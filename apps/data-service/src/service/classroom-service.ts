import { Classroom, dbContext } from '@siakad/express.database';
import { Logger, contextLogger } from '@siakad/express.utils';
import { toCreateClassroomDto } from '../interface/classroom-dto';

export class ClassroomService {
    static async getListClassroom(query: any): Promise<any> {
    try {
      const { limit, offset, where } = query;

      const classrooms = await dbContext
        .Classroom()
        .createQueryBuilder('classroom')
        .innerJoinAndSelect('classroom.course', 'course')
        .innerJoinAndSelect('classroom.faculty', 'faculty')
        .orderBy('classroom.classroom_id', 'ASC')
        .where(where)
        .skip(offset)
        .take(limit)
        .getMany();

      

      return classrooms.map((classroom: Classroom) => toCreateClassroomDto(classroom));

    } catch (error) {
      Logger.error(`Error: ${error.message}`);
      throw error;
    }
  }
}
