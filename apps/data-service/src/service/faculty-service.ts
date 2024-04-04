import { Faculty, dbContext } from '@siakad/express.database';
import { Logger, contextLogger, buildWhereCondition, queryInterface } from '@siakad/express.utils';
import { CreateDTO, DTO } from '../utils/queryParams';
import { CreateFacultyDto, UpdateFacultyDto, toCreateFacultyDTO } from '../interface/faculty-dto';

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

    static async patchFacultyByID(payload: UpdateFacultyDto): Promise<CreateDTO> {
        const { id, name, } = payload;

        // Faculty ENTITY
        const updateData = {
            faculty_id:id,
            faculty_name: name,
        };

        const condition = { faculty_id: id };

        try {
            const isDataExist = await Promise.all([
                Faculty.findOne({ where: { faculty_id: id } })
            ]);
    
            if (!isDataExist) {
                Logger.info(`${contextLogger.patchClassroomService} | Data not found`);
                return { data: [] };
            }
            await dbContext.Course()
                .createQueryBuilder('faculty')
                .update(Faculty)
                .set(updateData)
                .where(condition)
                .execute();

            // Find existing course
            const existingFaculty = await dbContext.Faculty().findOne({ where: { faculty_id: id } });
            if (!existingFaculty) {
                Logger.info(`${contextLogger.patchFacultyService} | faculty not found`);
                return { data: [] };
            }

            Logger.info(`${contextLogger.patchFacultyService} | faculty updated successfully`);
            return { data: existingFaculty };

        } catch (error) {
            Logger.error(`${contextLogger.patchFacultyService} | Error: ${error.message}`);
            return { data: [] };
        }
    }

    static async deleteFacultyByID(id: string): Promise<CreateDTO> {
        try {
            const isDataExist = await Promise.all([
                Faculty.findOne({ where: { faculty_id: parseInt(id) } })
            ]);
    
            if (!isDataExist) {
                Logger.info(`${contextLogger.deleteFacultyService} | Data not found`);
                return { data: [] };
            }

            await dbContext
                .Faculty()
                .createQueryBuilder('faculty')
                .delete()
                .where('faculty.faculty_id = :id', { id })
                .execute();
    
            // Find existing faculty
            const existingFaculty = await dbContext.Faculty().findOne({ where: { faculty_id: parseInt(id) } });
            if (!existingFaculty) {
                Logger.info(`${contextLogger.deleteFacultyService} | Faculty deleted successfully`);
                return { data: [] };
            }
        } catch (error) {
            Logger.error(
                `${contextLogger.deleteCourseService} | Error: ${error.message}`
            );
            throw error;
        }
    }
}