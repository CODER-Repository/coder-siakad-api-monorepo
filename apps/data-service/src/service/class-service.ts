import { Class, dbContext } from '@siakad/express.database';
import { Logger, contextLogger } from '@siakad/express.utils';
import { toCreateClassDto } from '../interface/class-dto';

export class ClassService {
  static async getListClass(query: any): Promise<any> {
    try {
      const { limit, offset, where } = query;

      const classes = await dbContext
      .Class()
      .createQueryBuilder('class')
      .where(where)
      .skip(offset)
      .take(limit)
      .getMany();

      return classes.map((classItem: Class) => toCreateClassDto(classItem));  

    } catch (error) {
      Logger.error(
        `${contextLogger.getClassService} | Error: ${error.message}`
      );
      throw error;
    }
  }
}