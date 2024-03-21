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
        .innerJoin('classroom.course', 'course', 'classroom.classroom_id = course.course_id')
        .innerJoin('classroom.faculty', 'faculty', 'classroom.faculty_id = faculty.faculty_id')
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
