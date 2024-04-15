import { QueryParamsDto } from '../utils/queryParams';

export const ToSeqWhereClass = (q: QueryParamsDto) => {
    const filterQuery: Object = {};
    
    // KEY MAP entity.column
    const mapKeys = {
        id: 'class.class_id',
        class: 'class.class_name',
        courseId: 'course.course_id',
        courseName: 'course.course_name',
        scheduleId: 'schedule.schedule_id',
        day: 'schedule.day',
        startTime: 'schedule.start_time',
        endTime: 'schedule.end_time'
    };

    for (const key in q) {
        if (q.hasOwnProperty(key) && mapKeys[key]) {
            filterQuery[mapKeys[key]] = q[key];
        }
    }

    return filterQuery;
};
