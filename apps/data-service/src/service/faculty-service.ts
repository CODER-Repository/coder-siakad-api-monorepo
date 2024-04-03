import { Faculty, dbContext } from '@siakad/express.database';
import { Logger, contextLogger, buildWhereCondition, queryInterface } from '@siakad/express.utils';
import { CreateDTO, DTO } from '../utils/queryParams';
import { toCreateFacultyDTO } from '../interface/faculty-dto';

export class FacultyService {
    static async getListFaculty(query: queryInterface): Promise<DTO> {
        try {
            const { limit, offset, where } = query;
            const { condition, parameters } = buildWhereCondition(where);

            // MAKE QUERY
            const queryBuilder = dbContext
                .Faculty()
                .createQueryBuilder('faculty')
                .innerJoinAndSelect('faculty.classroom', 'classroom')
                .addSelect('classroom.classroom_name')
                .orderBy('faculty.faculty_id', 'ASC')
                .where(condition, parameters)
                .skip(offset)
                .take(limit);
        

            // GET DATA AND COUNT
            const faculties = await queryBuilder.getMany();
            const totalCount = await queryBuilder.getCount();
            const totalPages = Math.ceil(totalCount / limit);

            // RETRIVED DATA & PAGINATION
            const listFaculty = faculties.map((item: Faculty) => toCreateFacultyDTO(item));
            const pagination = {
                totalCount,
                totalPage: totalPages,
                page: Math.floor(offset / limit) + 1,
                size: limit
            };

            return {
                data: listFaculty,
                pagination
            };

        } catch (error) {
            Logger.error(
                `${contextLogger.getFacultyService} | Error: ${error.message}`
            );
            throw error;
        }
    }
}