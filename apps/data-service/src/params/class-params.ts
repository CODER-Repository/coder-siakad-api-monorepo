import { Like, In } from 'typeorm';
import { QueryParamsDto } from '../utils/queryParams';

export const ToSqlWhere = (q: QueryParamsDto) => {
    let filterQuery = {};

    if (q['class_id']) {
        filterQuery['class_id'] = q['class_id'];
    }

    if (q['course_id']) {
        filterQuery['course_id'] = q['course_id'];
    }

    // query using sparator ,
    if (q['courses']) {
        const courseIds = q['courses'].split(',').map(a => a.trim());
        filterQuery['course_id'] = courseIds.length === 1 ? Like(`%${courseIds[0]}%`) : In(courseIds);
    }

    return filterQuery;
};
