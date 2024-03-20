import { Class, dbContext } from '@siakad/express.database';
import { Logger, contextLogger } from '@siakad/express.utils';
import { buildWhereCondition } from '../utils/queryParams';

export class ClassService {
  static async getListClass(query: any): Promise<any> {
    try {
      const { limit, offset, where } = query;

      const { whereCondition, columnKey } = buildWhereCondition(where, 'lecturer_id');

      console.log(whereCondition);
      const classes = await dbContext
      .Class()
      .createQueryBuilder('class')
      .where(whereCondition)
      .orWhere("class.lecturer_id IN (:...lecturers)", { lecturers: columnKey })
      .skip(offset)
      .take(limit)
      .getMany();

      const listClass = Array.isArray(classes) ? classes.map((item) => ({
        class_id: item.class_id,
        course_id: item.course_id,
        classroom: item.classroom_id,
        lecturer: item.lecturer_id
      })) : [];

      return listClass;

    } catch (error) {
      Logger.error(`Error: ${error.message}`);
      throw error;
    }
  }
}