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
    if (q['nim']) {
        const nimIds = q['nim'].split(',').map(a => a.trim());
        if (nimIds.length === 1) {
            filterQuery['nim'] = Like(`%${nimIds[0]}%`);
        } else if (nimIds.length > 1) {
            filterQuery['nim'] = In(nimIds);
        }
    }


    return filterQuery;
};
