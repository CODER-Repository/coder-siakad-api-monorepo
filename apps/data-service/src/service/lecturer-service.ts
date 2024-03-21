import { dbContext, Lecturer } from '@siakad/express.database';
import { Logger } from '@siakad/express.utils';
import { CreateLectureDto, toCreateLecturerDto } from '../interface/lecturer-dto';

export class LecturerService {
    static async getListLecturer(query: { limit: number, offset: number, where: Object }): Promise<CreateLectureDto[]> {
        try {
            const { limit, offset, where } = query;

            const lectures = await dbContext
                .Lecturer()
                .createQueryBuilder('lecturer')
                .where(where)
                .skip(offset)
                .take(limit)
                .getMany();

            return lectures.map((lecturer: Lecturer) => toCreateLecturerDto(lecturer));
            // const listLecturer = Array.isArray(lectures) ? lectures.map((item) => ({
            //   nip: item.nip,
            //   name: item.name,
            //   gender: item.type,
            //   email: item.email,
            //   phone: item.phone_number,
            //   course_name: item.class.classroom.classroom_name
            // })) : [];

            // return listLecturer;
        } catch (error) {
            Logger.error(`[LecturerService.getListLecturer] Error: ${error.message}`);
            throw error;
        }
    }
}
