import { QueryParamsDto } from '../utils/queryParams';

export const ToSeqWhereSchedule = (q: QueryParamsDto) => {
    const filterQuery: Object = {};
    
    // KEY MAP entity.column
    const mapKeys = {
        schedule_id: 'schedule.schedule_id',
        class_id: 'class.class_id',
        course_room: 'class.classroom.classroom_name',
    };

    for (const key in q) {
        if (q.hasOwnProperty(key) && mapKeys[key]) {
            filterQuery[mapKeys[key]] = q[key];
        }
    }

    return filterQuery;
};
