import { QueryParamsDto } from '../utils/queryParams';

export const ToSeqWhereKHS = (q: QueryParamsDto) => {
    const filterQuery: Object = {};
    
    // KEY MAP entity.column
    const mapKeys = {
        course_name: 'course.course_name',
        nim: 'krs.student.nim',
        student: 'krs.student.full_name',
        lecturer: 'class.lecturer.name',
        semester: 'semester.semester_id',
        sks:'krs.credit_hours',
    };

    for (const key in q) {
        if (q.hasOwnProperty(key) && mapKeys[key]) {
            filterQuery[mapKeys[key]] = q[key];
        }
    }

    return filterQuery;
};
