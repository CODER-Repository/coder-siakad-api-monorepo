import { Student, dbContext } from '@siakad/express.database';
import { Logger, queryInterface, buildWhereCondition, contextLogger } from '@siakad/express.utils';
import { toCreateStudentDto } from '../interface/student-dto';
import { CreateDTO, DTO } from '../utils/queryParams';

export class StudentService {
    static async getListStudent(query: queryInterface): Promise<DTO> {
        try {
            const { limit, offset, where } = query;
            const { condition, parameters } = buildWhereCondition(where);

            // MAKE QUERY
            const queryBuilder = dbContext
                .Student()
                .createQueryBuilder('student')
                .where(condition, parameters)
                .skip(offset)
                .take(limit)
            
            // GET DATA AND COUNT
            const students = await queryBuilder.getMany();
            const totalCount = await queryBuilder.getCount();
            const totalPages = Math.ceil(totalCount / limit);

            // RETRIVED DATA & PAGINATION
            const listStudent = students.map((student: Student) => toCreateStudentDto(student));
            const pagination = {
                totalCount,
                totalPage: totalPages,
                page: Math.floor(offset / limit) + 1,
                size: limit
            };

            
            return {
                data: listStudent,
                pagination
            };


        } catch (error) {
            Logger.error(`Error: ${error.message}`);
            throw error;
        }
    }

    static async deleteStudentByUserID(id: string): Promise<CreateDTO> {
        try {
            const lecturerToDelete = await dbContext.Student().findOne({ where: { user_id: id } });
            
            if (!lecturerToDelete) {
                Logger.info(`${contextLogger.deleteStudentService} | Student not found`);
                return { data: [] };
            }
    
            await dbContext.Student().delete({ user_id: id });

            Logger.info(`${contextLogger.deleteStudentService} | Success deleted Student`);
            return { data: [] };
    
        } catch (error) {
            Logger.error(`${contextLogger.deleteStudentService} Error: ${error.message}`);
        }
    }
}
