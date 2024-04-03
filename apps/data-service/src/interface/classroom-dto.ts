import { Classroom } from '@siakad/express.database';

export interface CreateClassroomDto {
    id: string;
    classroom: string;
    facultyId: number;
    facultyName: string;
    courseId: string;
    courseName: string;
}

export const toCreateClassroomDto = (e: Classroom): CreateClassroomDto => ({
    id: e?.classroom_id,
    classroom: e?.classroom_name,
    facultyId: e?.faculty.faculty_id,
    facultyName: e?.faculty.faculty_name,
    courseId: e?.course[0].course_id,
    courseName: e?.course[0].course_name
});
