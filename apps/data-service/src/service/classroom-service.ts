import { Classroom, dbContext } from '@siakad/express.database';
import { Logger, queryInterface, buildWhereCondition } from '@siakad/express.utils';
import { toCreateClassroomDto } from '../interface/classroom-dto';
import { DTO } from '../utils/queryParams';

export class ClassroomService {
    static async getListClassroom(query: queryInterface): Promise<DTO> {
        try {
            const { limit, offset, where } = query;
            const { condition, parameters } = buildWhereCondition(where)

            // MAKE QUERY
            const queryBuilder = dbContext
                .Classroom()
                .createQueryBuilder('classroom')
                .innerJoinAndSelect('classroom.course', 'course')
                .innerJoinAndSelect('classroom.faculty', 'faculty')
                .orderBy('classroom.classroom_id', 'ASC')
                .where(condition, parameters)
                .skip(offset)
                .take(limit);

            // GET DATA AND COUNT
            const classrooms = await queryBuilder.getMany();
            const totalCount = await queryBuilder.getCount();
            const totalPages = Math.ceil(totalCount / limit);

            // RETRIVED DATA & PAGINATION
            const listClassroom = classrooms.map((classroom: Classroom) => toCreateClassroomDto(classroom));
            const pagination = {
                totalCount,
                totalPage: totalPages,
                page: Math.floor(offset / limit) + 1,
                size: limit
            };

            return {
                data: listClassroom,
                pagination
            };

        } catch (error) {
            Logger.error(`Error: ${error.message}`);
            throw error;
        }
    }
}
