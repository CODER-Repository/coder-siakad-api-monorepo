import { dbContext, Lecturer } from '@siakad/express.database';
import { Logger } from '@siakad/express.utils';

export class LecturerService {
    static async getListLecturer(query: { offset: number; limit: number; where: {} }): Promise<Array<object>> {
        try {
            const { limit, offset, where } = query;

            const lectures = await dbContext
                .Lecturer()
                .createQueryBuilder('lecturer')
                .where(where)
                .skip(offset)
                .take(limit)
                .getMany();

            return lectures.map((item: Lecturer) => ({
                nip: item.nip,
                name: item.name,
                gender: item.type,
                email: item.email,
                phone: item.phone_number,
                course_name: item.class.classroom.classroom_name
            }));

        } catch (error) {
            Logger.error(`[LecturerService.getListLecturer] Error: ${error.message}`);
            throw error;
        }
    }
}
