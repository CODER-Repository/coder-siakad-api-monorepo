import { Schedule } from '@siakad/express.database';
import { Day } from '@siakad/express.utils';

export interface CreateScheduleDTO {
    id: string;
    nip: string;
    nim: string;
    courseID: string;
    classID: string;
    semesterID: string;
    day: Day;
    startTime: string;
    endTime: string;
}

export const toCreateCoursedTO = (e: Schedule): CreateScheduleDTO => ({
    id: e?.schedule_id,
    courseID: e?.course_id,
    classID: e?.class_id,
    semesterID: e?.semester_id,
    nip: e?.lecturer_id,
    nim: e?.nim,
    day: e?.day,
    startTime:  e?.start_time,
    endTime:  e?.end_time,
});
  