import { QueryParamsDto } from '../utils/queryParams';

export const ToSeqWhereKHS = (q: QueryParamsDto) => {
    const filterQuery: Object = {};
    
    // KEY MAP entity.column
    const mapKeys = {
        nim: 'krs.student.nim',
        nip: 'class.lecturer.nip',
        student: 'krs.student.full_name',
        lecturer: 'class.lecturer.name',
    };

    for (const key in q) {
        if (q.hasOwnProperty(key) && mapKeys[key]) {
            filterQuery[mapKeys[key]] = q[key];
        }
    }

    return filterQuery;
};
