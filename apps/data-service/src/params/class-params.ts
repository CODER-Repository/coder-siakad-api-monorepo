import { QueryParamsDto } from '../utils/queryParams';

export const ToSeqWhereClass = (q: QueryParamsDto) => {
    const filterQuery: Object = {};
    
    // KEY MAP entity.column
    const mapKeys = {
        id: 'class.class_id',
        class: 'class.class_name',
        courseId: 'course.course_id',
        courseName: 'course.course_name',
    };

    for (const key in q) {
        if (q.hasOwnProperty(key) && mapKeys[key]) {
            filterQuery[mapKeys[key]] = q[key];
        }
    }

    return filterQuery;
};
