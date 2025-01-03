import {
  Address,
  Administrator,
  Announcement,
  Attendance,
  Class,
  EvaluationLecturer,
  EvaluationReportLecturer,
  GradeCategory,
  KRS,
  PaymentHistory,
  Report,
  Semester,
  Student,
  UKT,
  User,
  Role,
  RoleUser,
  Schedule,
  Classroom,
  Faculty,
  Course,
  Lecturer
} from './entities';

import { UserRoleView } from './views';

interface DbContext {
  User: () => typeof User;
  Student: () => typeof Student;
  Address: () => typeof Address;
  Administrator: () => typeof Administrator;
  Announcement: () => typeof Announcement;
  Attendance: () => typeof Attendance;  
  Class: () => typeof Class;
  EvaluationLecturer: () => typeof EvaluationLecturer;
  EvaluationReportLecturer: () => typeof EvaluationReportLecturer;
  GradeCategory: () => typeof GradeCategory;
  KRS: () => typeof KRS;
  Report: () => typeof Report;
  Role: () => typeof Role;
  RoleUser: () => typeof RoleUser;
  Semester: () => typeof Semester;
  UKT: () => typeof UKT;
  PaymentHistory: () => typeof PaymentHistory;
  Schedule: () => typeof Schedule;
  Classroom: () => typeof Classroom;
  Faculty: () => typeof Faculty;
  Course: () => typeof Course;
  Lecturer: () => typeof Lecturer;
  // Views
  UserRoleView: () => typeof UserRoleView;
}

export class DbContextClass implements DbContext {
  User = () => User;
  Student = () => Student;
  Address = () => Address;
  Administrator = () => Administrator;
  Announcement = () => Announcement;
  Attendance = () => Attendance;
  Class = () => Class;
  EvaluationLecturer = () => EvaluationLecturer;
  EvaluationReportLecturer = () => EvaluationReportLecturer;
  GradeCategory = () => GradeCategory;
  KRS = () => KRS;
  Report = () => Report;
  Role = () => Role;
  RoleUser = () => RoleUser;
  Semester = () => Semester;
  UKT = () => UKT;
  PaymentHistory = () => PaymentHistory;
  Schedule = () => Schedule;
  Classroom = () => Classroom;
  Faculty = () => Faculty;
  Course = () => Course;
  Lecturer = () => Lecturer;
  // Views
  UserRoleView = () => UserRoleView;
}

export const dbContext = new DbContextClass();
