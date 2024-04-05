import { Course } from '@siakad/express.database';

// TODO JOIN ENTITY
export interface CreateCourseDto {
    // nim: string;
    // student: string;
    nip: string;
    lecturer: string;
}

export const toCreateKHS = (e: Course): CreateCourseDto => ({
    nip: e?.classes.lecturer.nip,
    lecturer: e?.classes.lecturer.name,
});
  