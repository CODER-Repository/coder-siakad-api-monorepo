import { Classroom, dbContext } from '@siakad/express.database';
import { Logger, SqlPagination } from '@siakad/express.utils';
import { CreateClassroomDto, toCreateClassroomDto } from '../interface/classroom-dto';

export class ClassroomService {
    static async getListClassroom(query: SqlPagination): Promise<CreateClassroomDto[]> {
        try {
            const { limit, offset, where } = query;

            const classrooms = await dbContext
                .Classroom()
                .createQueryBuilder('classroom')
                .innerJoinAndSelect('classroom.course', 'course')
                .innerJoinAndSelect('classroom.faculty', 'faculty')
                .orderBy('classroom.classroom_id', 'ASC')
                .where(where)
                .skip(offset)
                .take(limit)
                .getMany();


            return classrooms.map((classroom: Classroom) => toCreateClassroomDto(classroom));

        } catch (error) {
            Logger.error(`Error: ${error.message}`);
            throw error;
        }
    }
}
