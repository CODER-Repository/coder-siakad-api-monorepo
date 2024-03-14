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
  User,
  Role,
  RoleUser,
  Schedule,
  Classroom,
  Faculty
} from './entities';

import { UserRoleView } from './views';

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
  Role: () => typeof Role;
  RoleUser: () => typeof RoleUser;
  Semester: () => typeof Semester;
  UKT: () => typeof UKT;
  Schedule: () => typeof Schedule;
  Classroom: () => typeof Classroom;
  Faculty: () => typeof Faculty;
  // Views
  UserRoleView: () => typeof UserRoleView;
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
  Role = () => Role;
  RoleUser = () => RoleUser;
  Semester = () => Semester;
  UKT = () => UKT;
  Schedule = () => Schedule;
  Classroom = () => Classroom;
  Faculty = () => Faculty;
  // Views
  UserRoleView = () => UserRoleView;
}

export const dbContext = new DbContextClass();
