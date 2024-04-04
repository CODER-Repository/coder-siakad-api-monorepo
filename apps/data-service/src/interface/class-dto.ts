import { Class, Schedule } from '@siakad/express.database';
import { Day } from '@siakad/express.utils';

export interface CreateClassDto {
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
    endTime: string,
}

export const toCreateClassDto = (e: Class): CreateClassDto => ({
    id: e?.class_id,
    courseId: e?.course.course_id,
    course: e?.course.course_name,
    classroomId: e?.classroom.classroom_id,
    classroom: e?.classroom.classroom_name,
    nip: e?.lecturer.nip,
    lecturer: e?.lecturer.name,
    scheduleId: e?.schedule.schedule_id,
    day: e?.schedule.day,
    startTime: e?.schedule.start_time,
    endTime: e?.schedule.end_time,
});

export const toCreateClassDtoBySchedule = (e: Schedule): CreateClassDto => ({
    id: e?.class_id,
    courseId: e?.course.course_id,
    course: e?.course.course_name,
    classroomId: e?.class.classroom_id,
    classroom: e?.class.classroom.classroom_name,
    nip: e?.class.lecturer.nip,
    lecturer: e?.class.lecturer.name,
    scheduleId: e?.schedule_id,
    day: e?.day,
    startTime: e?.start_time,
    endTime: e?.end_time,
});