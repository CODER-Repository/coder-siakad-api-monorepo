import { Classroom } from "@siakad/express.database";

export interface CreateClassroomDto {
  id: string;
  classroomName: string;
  faculty: string;
  courseId: string;
  courseName: string;
}

export const toCreateClassroomDto = (e: Classroom): CreateClassroomDto => ({
  id: e?.classroom_id,
  classroomName: e?.classroom_name,
  faculty: e?.faculty?.faculty_name,
  courseId: e?.course?.course_id,
  courseName: e?.course?.course_name,
});
