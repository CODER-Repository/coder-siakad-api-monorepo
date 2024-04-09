import { Class, Schedule } from '@siakad/express.database';
import { Day } from '@siakad/express.utils';

export interface UpdateClassDto {
    id: string;
    courseId: string;
    course: string;
    classroomId: string;
    classroom: string;
    nip: string;
    lecturer: string;
    scheduleId: string;
    day: Day;
    startTime: string,
    endTime: string
}
export interface CreateClassDto {
    id: string;
    courseId: string;
    course: string;
    classroomId: string;
    classroom: string;
    nip: string;
    lecturer: string;
    schedules: {  
        scheduleId: string;
        day: Day;
        startTime: string,
        endTime: string, 
    }[]
}

export const toCreateClassDto = (e: Class): CreateClassDto => ({
    id: e?.class_id,
    courseId: e?.course.course_id,
    course: e?.course.course_name,
    classroomId: e?.classroom.classroom_id,
    classroom: e?.classroom.classroom_name,
    nip: e?.lecturer.nip,
    lecturer: e?.lecturer.name,
    schedules: Array.isArray(e.schedules) ? e.schedules.map(i => ({
        scheduleId: i.schedule_id,
        day: i.day,
        startTime: i.start_time,
        endTime: i.end_time
    })) : [],
});
