import { Class, dbContext } from '@siakad/express.database';
import { Logger, contextLogger } from '@siakad/express.utils';
import { CreateClassDto, toCreateClassDto } from '../interface/class-dto';

export class ClassService {
    static async getListClass(query: { offset: number; limit: number; where: {} }): Promise<CreateClassDto[]> {
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