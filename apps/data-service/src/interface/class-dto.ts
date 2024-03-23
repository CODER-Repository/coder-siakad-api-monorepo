import { Class } from '@siakad/express.database';

export interface CreateClassDto {
    id: string;
    course: string;
    classroom: string;
    lecturer: string;
    day: string;
    startTime: string,
    endTime: string,

}

export const toCreateClassDto = (e: Class): CreateClassDto => ({
    id: e?.class_id,
    course: e?.course.course_name,
    classroom: e?.classroom.classroom_name,
    lecturer: e?.lecturer.name,
    day: e?.schedule.type,
    startTime: e?.schedule.start_time,
    endTime: e?.schedule.end_time,
});
  