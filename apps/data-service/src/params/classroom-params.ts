import { Like, In } from 'typeorm';
import { QueryParamsDto } from '../utils/queryParams';

export const ToSeqWhere = (q: QueryParamsDto) => {
    let filterQuery = {};

    if (q['id']) {
        filterQuery['classroom_id'] = q['id'];
    }

    if (q['classroomName']) {
        filterQuery['classroom_name'] = q['classroomName'];
    }

    return filterQuery;
};
