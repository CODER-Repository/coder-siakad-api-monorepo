import {
    Address,
    Administrator,
    Announcement,
    Class,
    EvaluationLecturer,
    EvaluationReportLecturer,
    GradeCategory,
    KRS,
    Report,
    Semester,
    Student,
    UKT,
    User
} from './entities';

interface DbContext {
    User: () => typeof User;
    Student: () => typeof Student;
    Address: () => typeof Address;
    Administrator: () => typeof Administrator;
    Announcement: () => typeof Announcement;
    Class: () => typeof Class;
    EvaluationLecturer: () => typeof EvaluationLecturer;
    EvaluationReportLecturer: () => typeof EvaluationReportLecturer;
    GradeCategory: () => typeof GradeCategory;
    KRS: () => typeof KRS;
    Report: () => typeof Report;
    Semester: () => typeof Semester;
    UKT: () => typeof UKT;
}

export class DbContextClass implements DbContext {
    User = () => User;
    Student = () => Student;
    Address = () => Address;
    Administrator = () => Administrator;
    Announcement = () => Announcement;
    Class = () => Class;
    EvaluationLecturer = () => EvaluationLecturer;
    EvaluationReportLecturer = () => EvaluationReportLecturer;
    GradeCategory = () => GradeCategory;
    KRS = () => KRS;
    Report = () => Report;
    Semester = () => Semester;
    UKT = () => UKT;
}

export const dbContext = new DbContextClass();
