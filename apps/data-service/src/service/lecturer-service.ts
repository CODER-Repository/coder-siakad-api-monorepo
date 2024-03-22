import { dbContext, Lecturer } from '@siakad/express.database';
import { buildWhereCondition, Logger, queryInterface } from '@siakad/express.utils';
import { CreateLectureDto, toCreateLecturerDto } from '../interface/lecturer-dto';

export class LecturerService {
    static async getListLecturer(query: queryInterface): Promise<CreateLectureDto[]> {
        try {
            const { limit, offset, where } = query;
            const { condition, parameters } = buildWhereCondition(where);

            const lectures = await dbContext
                .Lecturer()
                .createQueryBuilder('lecturer')
                .where(condition,parameters)
                .skip(offset)
                .take(limit)
                .getMany();

            return lectures.map((lecturer: Lecturer) => toCreateLecturerDto(lecturer));

        } catch (error) {
            Logger.error(`[LecturerService.getListLecturer] Error: ${error.message}`);
            throw error;
        }
    }
}
