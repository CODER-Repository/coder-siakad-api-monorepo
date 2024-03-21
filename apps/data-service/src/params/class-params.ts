import { Like, In } from 'typeorm';
import { QueryParamsDto } from '../utils/queryParams';

export const ToSeqWhere = (q: QueryParamsDto) => {
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
        if (courseIds.length === 1) {
            filterQuery['course_id'] = Like(`%${courseIds[0]}%`);
        } else if (courseIds.length > 1) {
            filterQuery['course_id'] = In(courseIds);
        }
    }


    return filterQuery;
};
