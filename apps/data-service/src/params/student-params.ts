import { Like, In } from 'typeorm';
import { QueryParamsDto } from '../utils/queryParams';

export const ToSqlWhere = (q: QueryParamsDto) => {
    let filterQuery = {};

    if (q['id']) {
        filterQuery['user_id'] = q['id'];
    }

    if (q['name']) {
        filterQuery['name'] = q['name'];
    }

    if (q['email']) {
        filterQuery['email'] = q['email'];
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
