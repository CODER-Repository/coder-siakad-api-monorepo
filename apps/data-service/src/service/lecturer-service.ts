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
            type: Gender[gender as keyof typeof Gender],
            email
        };
    
        const condition = { user_id: id };

        try {
            const lecturer = dbContext
                .Lecturer()
                .createQueryBuilder('lecturer')
                .update(Lecturer)
                .set(updateData)
                .where(condition)
                .execute();

            Logger.info(`${contextLogger.updateUser} | Lecturer updated successfully`);
            return { data: lecturer };
    } catch(error) {
        Logger.error(`[LecturerService.patchLecturer] Error: ${error.message}`);
    }
}    
}
