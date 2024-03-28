import { AppDataSource, dbContext, Lecturer } from '@siakad/express.database';
import { buildWhereCondition, contextLogger, Logger, queryInterface } from '@siakad/express.utils';
import { CreateLectureDto, toCreateLecturerDto } from '../interface/lecturer-dto';
import { CreateDTO, DTO } from '../utils/queryParams';
import { JsonResponse } from '@siakad/express.server';
import { Gender } from '@siakad/express.database/dist/entities/lecture.entity';

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

    static async pacthLecurerByUserID(payload: CreateLectureDto): Promise<CreateDTO> {
        const { id, nip, name, gender, phone, email } = payload;

        // LECTURE ENTITY
        const updateData = {
            nip,
            name,
            phone_number: phone,
            type: gender,
            email
        };

        const condition = { user_id: id };

        try {
            await dbContext.Lecturer()
                .createQueryBuilder('lecturer')
                .update(Lecturer)
                .set(updateData)
                .where(condition)
                .execute();

            // Find existing lecturer
            const existingLecturer = await dbContext.User().findOne({ where: { user_id: id } });
            if (!existingLecturer) {
                Logger.info(`${contextLogger.patchLecturerService} | User not found`);
                return { data: [] };
            }

            Logger.info(`${contextLogger.patchLecturerService} | Lecturer updated successfully`);
            return { data: existingLecturer };

        } catch (error) {
            Logger.error(`${contextLogger.patchLecturerService} | Error: ${error.message}`);
        }
    }

    static async deleteLecturerByUserID(id: string): Promise<CreateDTO> {
        try {
            const lecturerToDelete = await dbContext.Lecturer().findOne({ where: { user_id: id } });
            
            if (!lecturerToDelete) {
                Logger.info(`${contextLogger.deleteLecturerService} | Lecturer not found`);
                return { data: [] };
            }
    
            await dbContext.Lecturer().delete({ user_id: id });

            Logger.info(`${contextLogger.deleteLecturerService} | Success deleted lecturer`);
            return { data: [] };
    
        } catch (error) {
            Logger.error(`${contextLogger.deleteLecturerService} Error: ${error.message}`);
        }
    }
    
}
