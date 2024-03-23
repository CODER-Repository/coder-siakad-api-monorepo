import { QueryParamsDto } from '../utils/queryParams';

export const ToSeqWhereCourse = (q: QueryParamsDto) => {
    const filterQuery: Object = {};
    
    // KEY MAP entity.column
    const mapKeys = {
        id: 'course.course_id',
        course: 'course.course_name',
        sks: 'course.credit_hours',
    };

    for (const key in q) {
        if (q.hasOwnProperty(key) && mapKeys[key]) {
            filterQuery[mapKeys[key]] = q[key];
        }
    }

    return filterQuery;
};
