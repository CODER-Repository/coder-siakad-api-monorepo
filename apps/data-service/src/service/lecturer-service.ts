import { dbContext, Lecturer } from '@siakad/express.database';
import { buildWhereCondition, Logger, queryInterface } from '@siakad/express.utils';
import { CreateLectureDto, toCreateLecturerDto } from '../interface/lecturer-dto';
import { DTO } from '../utils/queryParams';

export class LecturerService {
    static async getListLecturer(query: queryInterface): Promise<DTO> {
        try {
            const { limit, offset, where } = query;
            const { condition, parameters } = buildWhereCondition(where);

            // MAKE QUERY
            const queryBuilder = dbContext
                .Lecturer()
                .createQueryBuilder('lecturer')
                .where(condition, parameters)
                .skip(offset)
                .take(limit)
            
            // GET DATA AND COUNT
            const lectures = await queryBuilder.getMany();
            const totalCount = await queryBuilder.getCount();
            const totalPages = Math.ceil(totalCount / limit);

            // RETRIVED DATA & PAGINATION
            const listLecturer = lectures.map((lecturer: Lecturer) => toCreateLecturerDto(lecturer));
            const pagination = {
                totalCount,
                totalPage: totalPages,
                page: Math.floor(offset / limit) + 1,
                size: limit
            };

            return {
                data: listLecturer,
                pagination
            };

        } catch (error) {
            Logger.error(`[LecturerService.getListLecturer] Error: ${error.message}`);
            throw error;
        }
    }
}
