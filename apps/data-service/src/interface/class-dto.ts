import { Class } from "@siakad/express.database";

export interface CreateClassDto {
    id: string;
    course: string;
    classroom: string;
    lecturer: string;
    semester: number;

  }
  
  export const toCreateClassDto = (e: Class): CreateClassDto => ({
    id: e?.class_id,
    course: e?.course.course_name,
    classroom: e?.classroom.classroom_name,
    lecturer: e?.lecturer.name,
    semester: e?.semester_id,
  });
  