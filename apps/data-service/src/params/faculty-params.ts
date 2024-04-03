import { QueryParamsDto } from '../utils/queryParams';

export const ToSeqWhereFaculty = (q: QueryParamsDto) => {
    const filterQuery: Object = {};
    
    // KEY MAP entity.column
    const mapKeys = {
        id: 'faculty.faculty_id',
        name: 'faculty.faculty_name',
    };

    for (const key in q) {
        if (q.hasOwnProperty(key) && mapKeys[key]) {
            filterQuery[mapKeys[key]] = q[key];
        }
    }

    return filterQuery;
};
