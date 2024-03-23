import { Classroom } from '@siakad/express.database';

export interface CreateClassroomDto {
    id: string;
    classroom: string;
    faculty: string;
    courseId: string;
    courseName: string;
}

export const toCreateClassroomDto = (e: Classroom): CreateClassroomDto => ({
    id: e?.classroom_id,
    classroom: e?.classroom_name,
    faculty: e?.faculty.faculty_name,
    courseId: e?.course[0].course_id,
    courseName: e?.course[0].course_name
});
