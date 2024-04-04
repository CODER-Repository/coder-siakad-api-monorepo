import { QueryParamsDto } from '../utils/queryParams';

export const ToSeqWhereSchedule = (q: QueryParamsDto) => {
    const filterQuery: Object = {};
    
    // KEY MAP entity.column
    const mapKeys = {
        nim: 'schedule.nim',
        schedule_id: 'schedule.schedule_id',
        class_id: 'class.class_id',
        classroom_id: 'classroom.classroom_id',
        course_id: 'course.course_id',
        classroom_name: 'classroom.classroom_name',
        course_name: 'course.course_name',
        start_time: 'schedule.start_time',
        end_time: 'schedule.end_time',
        faculty: 'faculty.faculty_name',
    };

    for (const key in q) {
        if (q.hasOwnProperty(key) && mapKeys[key]) {
            filterQuery[mapKeys[key]] = q[key];
        }
    }

    return filterQuery;
};
