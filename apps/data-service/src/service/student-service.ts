import { Student, dbContext } from '@siakad/express.database';
import { Logger, queryInterface, buildWhereCondition } from '@siakad/express.utils';
import { CreateStudentDto, toCreateStudentDto } from '../interface/student-dto';

export class StudentService {
    static async getListStudent(query: queryInterface): Promise<CreateStudentDto[]> {
        try {
            const { limit, offset, where } = query;
            const { condition, parameters } = buildWhereCondition(where);

            const students = await dbContext
                .Student()
                .createQueryBuilder('student')
                .where(condition,parameters)
                .skip(offset)
                .take(limit)
                .getMany();

            return students.map((student: Student) => toCreateStudentDto(student));

        } catch (error) {
            Logger.error(`Error: ${error.message}`);
            throw error;
        }
    }
}
