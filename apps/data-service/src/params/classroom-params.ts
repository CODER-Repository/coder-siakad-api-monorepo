import { QueryParamsDto } from '../utils/queryParams';

export const ToSeqWhereClassroom = (q: QueryParamsDto) => {
    const filterQuery: Object = {};
    
    // KEY MAP entity.column
    const mapKeys = {
        id: 'classroom.classroom_id',
        classroom: 'classroom.classroom_name',
        courseId: 'course.course_id',
        courseName: 'course.course_name',
        facultyId: 'faculty.faculty_id',
        facultyName: 'faculty.faculty_name'
    };

    for (const key in q) {
        if (q.hasOwnProperty(key) && mapKeys[key]) {
            filterQuery[mapKeys[key]] = q[key];
        }
    }

    return filterQuery;
};
