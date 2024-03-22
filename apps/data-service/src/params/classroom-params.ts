import { QueryParamsDto } from '../utils/queryParams';

export const ToSeqWhere = (q: QueryParamsDto) => {
    const filterQuery: Object = {};
    
    // KEY MAP entity.column
    const mapKeys = {
        id: 'classroom.classroom_id',
        classroom: 'classroom.classroom_name',
        courseName: 'course.course_name',
        facultyName: 'faculty.faculty_name'
    };

    for (const key in q) {
        if (q.hasOwnProperty(key) && mapKeys[key]) {
            filterQuery[mapKeys[key]] = q[key];
        }
    }

    return filterQuery;
};
