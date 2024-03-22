import { Classroom, dbContext } from '@siakad/express.database';
import { Logger, SqlPagination, buildWhereCondition } from '@siakad/express.utils';
import { CreateClassroomDto, toCreateClassroomDto } from '../interface/classroom-dto';

export class ClassroomService {
    static async getListClassroom(query: SqlPagination): Promise<any> {
        try {
            const { limit, offset, where } = query;            
            const { condition, parameters } = buildWhereCondition(where)

            const classrooms = await dbContext
                .Classroom()
                .createQueryBuilder('classroom')
                .innerJoinAndSelect('classroom.course', 'course')
                .innerJoinAndSelect('classroom.faculty', 'faculty')
                .orderBy('classroom.classroom_id', 'ASC')
                .where(condition,parameters)
                .skip(offset)
                .take(limit)
                .getMany();

            const totalCount = await dbContext
                .Classroom()
                .createQueryBuilder('classroom')
                .innerJoinAndSelect('classroom.course', 'course')
                .innerJoinAndSelect('classroom.faculty', 'faculty')
                .orderBy('classroom.classroom_id', 'ASC')
                .where(condition,parameters)
                .skip(offset)
                .take(limit)
                .getCount();

            const totalPages = Math.ceil(totalCount / limit);

            const listClassroom = classrooms.map((classroom: Classroom) => toCreateClassroomDto(classroom));
            const pagination = {
                totalCount,
                totalPage: totalPages,
                page: Math.floor(offset / limit) + 1,
                size: limit
            };

            return {
                listClassroom,
                pagination
            };

        } catch (error) {
            Logger.error(`Error: ${error.message}`);
            throw error;
        }
    }
}
