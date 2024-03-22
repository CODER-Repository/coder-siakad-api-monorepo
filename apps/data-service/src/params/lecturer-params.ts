import { QueryParamsDto } from '../utils/queryParams';

export const ToSeqWhereLecturer = (q: QueryParamsDto) => {
    const filterQuery: Object = {};
    
    // KEY MAP entity.column
    const mapKeys = {
        id: 'lecturer.nip',
        name: 'lecturer.name',
        gender: 'lecturer.type',
        email: 'lecturer.email',
        phone:'lecturer.phone_number',
    };

    for (const key in q) {
        if (q.hasOwnProperty(key) && mapKeys[key]) {
            filterQuery[mapKeys[key]] = q[key];
        }
    }

    return filterQuery;
};
