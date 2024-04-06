import { Course } from '@siakad/express.database';

const gradeCategories = {
    0: 'E',
    50: 'D',
    61: 'C',
    71: 'B',
    81: 'A'
};

// Function to determine category based on grade
const determineCategory = (grade: number): string => {
    let category = 'E';
    Object.keys(gradeCategories).forEach((threshold) => {
        if (grade >= parseInt(threshold)) {
            category = gradeCategories[parseInt(threshold)];
        }
    });
    return category;
};

export interface CreateKHSDto {
    lecturer: string
    course: string
    course_id: string
    sks: number
    student: string
    nim: string
    historyGrades: { krs_id: string, semester_id: string, grade: number }[]
}

export const toCreateKHS = (e: Course): CreateKHSDto => ({
    nim: e.schedule[0].student.nim,
    student: e.schedule[0].student.full_name,
    course_id: e.course_id,
    course: e.course_name,
    sks: e.credit_hours,
    lecturer: e.schedule[0].lecturer.name,
    historyGrades: Array.isArray(e.krs) ? e.krs.map(i => ({
        krs_id: i.krs_id,
        semester_id: i.semester_id,
        grade: i.grade,
        category: determineCategory(i.grade)
    })) : [],
});
