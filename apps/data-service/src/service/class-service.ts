import { Class, dbContext } from '@siakad/express.database';
import { Logger, contextLogger, buildWhereCondition, queryInterface } from '@siakad/express.utils';
import { CreateClassDto, toCreateClassDto } from '../interface/class-dto';
import { DTO } from '../utils/queryParams';

export class ClassService {
    static async getListClass(query: queryInterface): Promise<DTO> {
        try {
            const { limit, offset, where } = query;
            const { condition, parameters } = buildWhereCondition(where);

            // MAKE QUERY
            const queryBuilder = dbContext
                .Class()
                .createQueryBuilder('class')
                .innerJoinAndSelect('class.course', 'course')
                .innerJoinAndSelect('class.lecturer', 'lecturer')
                .innerJoinAndSelect('class.classroom', 'classroom')
                .innerJoinAndSelect('class.schedule', 'schedule')
                .orderBy('class.class_id', 'ASC')
                .where(condition, parameters)
                .skip(offset)
                .take(limit)
            
            // GET DATA AND COUNT
            const classes = await queryBuilder.getMany();
            const totalCount = await queryBuilder.getCount();
            const totalPages = Math.ceil(totalCount / limit);

            // RETRIVED DATA & PAGINATION
            const listClass = classes.map((classroom: Class) => toCreateClassDto(classroom));
            const pagination = {
                totalCount,
                totalPage: totalPages,
                page: Math.floor(offset / limit) + 1,
                size: limit
            };

            return {
                data: listClass,
                pagination
            };

        } catch (error) {
            Logger.error(
                `${contextLogger.getClassService} | Error: ${error.message}`
            );
            throw error;
        }
    }
}