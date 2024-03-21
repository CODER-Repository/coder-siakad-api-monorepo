import { Like, In } from 'typeorm';
import { QueryParamsDto } from '../utils/queryParams';

export const ToSeqWhere = (q: QueryParamsDto) => {
    let filterQuery = {};

    if (q['name']) {
        filterQuery['name'] = q['name'];
    }

    if (q['email']) {
        filterQuery['email'] = q['email'];
    }

    // query using sparator ,
    if (q['nip']) {
        const lecturerIds = q['nip'].split(',').map(a => a.trim());
        if (lecturerIds.length === 1) {
            filterQuery['nip'] = Like(`%${lecturerIds[0]}%`);
        } else if (lecturerIds.length > 1) {
            filterQuery['nip'] = In(lecturerIds);
        }
    }
    

    return filterQuery;
};
