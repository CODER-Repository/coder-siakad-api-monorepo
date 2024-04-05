import { Course } from '@siakad/express.database';

// TODO JOIN ENTITY
export interface CreateCourseDto {
    lecturer: string
    course: string
    sks: number
    student: string
    nim: string
    historyGrades: { krs_id: string, semester_id: string, grade: number }[]
}

export const toCreateKHS = (e: Course): CreateCourseDto => ({
    nim: e.schedule[0].student.nim,
    student: e.schedule[0].student.full_name,
    course: e.course_name,
    sks: e.credit_hours,
    lecturer: e.schedule[0].lecturer.name,
    historyGrades: Array.isArray(e.krs) ? e.krs.map(i => ({ krs_id:i.krs_id, semester_id: i.semester_id, grade: i.grade })) : [],
});
