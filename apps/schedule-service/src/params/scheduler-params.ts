import { QueryParamsDto } from '../utils/queryParams';

export const ToSeqWhereSchedule = (q: QueryParamsDto) => {
    const filterQuery: Object = {};
    
    // KEY MAP entity.column
    const mapKeys = {
        id: 'schedule_id',
        class: 'class.class_id',
        clssroom: 'class.classroom.classroom_name',
    };

    for (const key in q) {
        if (q.hasOwnProperty(key) && mapKeys[key]) {
            filterQuery[mapKeys[key]] = q[key];
        }
    }

    return filterQuery;
};
