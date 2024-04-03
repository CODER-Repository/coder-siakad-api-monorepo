import { Student, dbContext } from '@siakad/express.database';
import { Logger, queryInterface, buildWhereCondition, contextLogger } from '@siakad/express.utils';
import { CreateStudentDto, toCreateStudentDto } from '../interface/student-dto';
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

    static async patchStudentByUserID(payload: CreateStudentDto): Promise<CreateDTO> {
        const { id, nim, name, major, entryYear, email, phone, birthday, } = payload;

        // LECTURE ENTITY
        const updateData = {
            nim,
            full_name: name,
            phone_number: phone,
            email,
            entryYear,
            major_id: major,
            birth_date: birthday
        };

        const condition = { user_id: id };

        try {
            await dbContext.Student()
                .createQueryBuilder('student')
                .update(Student)
                .set(updateData)
                .where(condition)
                .execute();

            // Find existing lecturer
            const existingStudent = await dbContext.User().findOne({ where: { user_id: id } });
            if (!existingStudent) {
                Logger.info(`${contextLogger.patchStudentService} | student not found`);
                return { data: [] };
            }

            Logger.info(`${contextLogger.patchStudentService} | Student updated successfully`);
            return { data: existingStudent };

        } catch (error) {
            Logger.error(`${contextLogger.patchStudentService} | Error: ${error.message}`);
        }
    }

    static async deleteStudentByUserID(id: string): Promise<CreateDTO> {
        try {
            const studentToDelete = await dbContext.Student().findOne({ where: { user_id: id } });
            
            if (!studentToDelete) {
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
