import { Lecturer } from '@siakad/express.database';
import { Gender } from '@siakad/express.database/dist/entities/lecture.entity';

export interface CreateLectureDto {
    id: string;
    nip: string;
    name: string;
    gender: Gender;
    phone: string;
    email: string;
}

export const toCreateLecturerDto = (e: Lecturer): CreateLectureDto => ({
    id: e?.user_id,
    nip: e?.nip,
    name: e?.name,
    gender: e?.type,
    phone: e?.phone_number,
    email: e?.email
});
  