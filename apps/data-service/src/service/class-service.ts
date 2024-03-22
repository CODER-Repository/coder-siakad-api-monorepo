import { Class, dbContext } from '@siakad/express.database';
import { Logger, contextLogger, buildWhereCondition, queryInterface } from '@siakad/express.utils';
import { CreateClassDto, toCreateClassDto } from '../interface/class-dto';

export class ClassService {
    static async getListClass(query: queryInterface): Promise<CreateClassDto[]> {
        try {
            const { limit, offset, where } = query;
            const { condition, parameters } = buildWhereCondition(where);

            const classes = await dbContext
                .Class()
                .createQueryBuilder('class')
                .where(condition,parameters)
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