import { Class, dbContext } from '@siakad/express.database';
import { Logger, contextLogger } from '@siakad/express.utils';

export class ClassService {
  static async getListClass(query: any): Promise<any> {
    try {
      const { limit, offset, where } = query;

      const classes = await dbContext
      .Class()
      .createQueryBuilder('class')
      .innerJoin('class.classroom', 'classroom')
      .innerJoin('class.course', 'course')
      .innerJoin('class.lecturer', 'lecturer')
      .where(where)
      .skip(offset)
      .take(limit)
      .getMany();

      // const listClass = classes.map((books: Book[]) => {
      //   return books.map((book: Clas) => ToCreateBookDto(book));
      // }),
  
  const listClass = Array.isArray(classes) ? classes.map((item) => ({
      class_id: item.class_id,
      course_id: item.course.course_name,
      classroom: item.classroom.classroom_name,
      lecturer: item.lecturer.name,
  })) : [];
  
  return listClass;
  
  

    } catch (error) {
      Logger.error(
        `${contextLogger.getClassService} | Error: ${error.message}`
      );
      throw error;
    }
  }
}