import { Course } from '@siakad/express.database';

export interface CreateCourseDto {
    id: string;
    course: string;
    sks: number;
}

export const toCreateCoursedTO = (e: Course): CreateCourseDto => ({
    id: e?.course_id,
    course: e?.course_name,
    sks: e?.credit_hours,
});
  