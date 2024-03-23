import { QueryParamsDto } from '../utils/queryParams';

export const ToSeqWhereStudent = (q: QueryParamsDto) => {
    const filterQuery: Object = {};
    
    // KEY MAP entity.column
    const mapKeys = {
        id: 'student.nim',
        name: 'student.full_name',
        addreess: 'student.address_id',
        major: 'student.major_id',
        birthday: 'student.birth_date',
    };

    for (const key in q) {
        if (q.hasOwnProperty(key) && mapKeys[key]) {
            filterQuery[mapKeys[key]] = q[key];
        }
    }

    return filterQuery;
};
