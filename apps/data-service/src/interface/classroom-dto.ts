import { Classroom } from '@siakad/express.database';

export interface CreateClassroomDto {
    id: string;
    classroomName: string;
    faculty: string;
    courseId: any;
    courseName: any;
}

export const toCreateClassroomDto = (e: Classroom): CreateClassroomDto => ({
    id: e?.classroom_id,
    classroomName: e?.classroom_name,
    faculty: e?.faculty.faculty_name,
    courseId: e?.course[0].course_id,
    courseName: e?.course[0].course_name
});
