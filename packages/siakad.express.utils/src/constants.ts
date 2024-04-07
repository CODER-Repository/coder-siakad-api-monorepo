/* eslint-disable no-unused-vars */
export const ROLE_ID = {
  Admin: 'ADM',
  SuperAdmin: 'SP_ADM',
  Student: 'STD',
  Lecturer: 'LCT'
};

export enum ROLE_ID_ENUM {
  SuperAdmin = 'SP_ADM',
  Admin = 'ADM',
  Student = 'STD',
  Lecturer = 'LCT'
}

export const SEMESTER_ID = {
  '2018_GANJIL': '2018A',
  '2018_GENAP': '2018B',
  '2019_GANJIL': '2019A',
  '2019_GENAP': '2019B',
  '2020_GANJIL': '2020A',
  '2020_GENAP': '2020B',
  '2021_GANJIL': '2021A',
  '2021_GENAP': '2021B',
  '2022_GANJIL': '2022A',
  '2022_GENAP': '2022B',
  '2023_GANJIL': '2023A',
  '2023_GENAP': '2023B',
  '2024_GANJIL': '2024A',
  '2024_GENAP': '2024B'
};

export enum Day {
  Sunday = 'sunday',
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday'
}

export const PORT_SERVICE = {
  authService: 5001,
  mockService: 5002,
  userService: 5003,
  paymentService: 5004,
  dashboardService: 5006,
  announceService: 5007,
  krsService: 5008,
  dataService: 5009,
  scheduleService: 5010,
  // add more
};

export const resMessage = {
  badImplementation: 'Internal Server Error',
  badRequest: 'Invalid input payload',
  notFound: 'Data not found',
  emptyData: 'Data is empty',
  success: 'Successfully',
  validationRole: 'Role is not allowed',
  forbidden: 'Cannot access this API',
  created: 'Successfully created data',
  updated: 'Successfully updated data',
  deleted: 'Successfully deleted data'
  // add more
};

export const contextLogger = {
  //Auth Service
  userRegister: '[AuthController.registerUser]',
  userLogin: '[AuthController.login]',

  // Data Service
  getFacultyController: '[FacultyController.getFaculty]',
  deleteFacultyController: '[FacultyController.patchFaculty]',
  patchFacultyController: '[FacultyController.deleteFaculty]',
  getClassController: '[ClassController.getClass]',
  patchClassController: '[ClassController.patchClass]',
  deleteClassController: '[ClassController.deleteClass]',
  getClassroomController: '[ClassroomController.getClassroom]',
  patchClassroomController: '[ClassroomController.patchClassroom]',
  deleteClassroomController: '[ClassroomController.deleteClassroom]',
  getLecturerController: '[LecturerController.getLecturer]',
  patchLecturerController: '[LecturerController.updatedLecturer]',
  deleteLecturerController: '[LecturerController.deleteLecturer]',
  getStudentController: '[StudentController.getStudent]',
  patchStudentController: '[StudentController.updateStudent]',
  deleteStudentController: '[StudentController.deleteStudent]',
  getCourseController: '[CourseController.getCourse]',
  patchCourseController: '[CourseController.updateCourse]',
  deleteCourseController: '[CourseController.deleteCourse]',

  getFacultyService: '[FacultyService.getFaculty]',
  patchFacultyService: '[FacultyService.patchFaculty]',
  deleteFacultyService: '[FacultyService.deleteFaculty]',
  getCourseService: '[CourseService.getListCourse]',
  patchCourseService: '[CourseService.updateCourse]',
  deleteCourseService: '[CourseService.deleteCourse]',
  getClassService: '[ScheduleService.getListClass]',
  patchClassService: '[ScheduleService.patchClass]',
  deleteClassService: '[ScheduleService.deleteClass]',
  getClassroomService: '[ClassroomService.getListClassroom]',
  patchClassroomService: '[ClassroomService.patchClassroom]',
  deleteClassroomService: '[ClassroomService.deleteClassroom]',
  getLecturerService: '[LecrurerService.getListLecturer]',
  patchLecturerService: '[LecrurerService.updateLecturer]',
  deleteLecturerService: '[LecrurerService.deleteLecturer]',
  getStudentService: '[StudentService.getListStudent]',
  patchStudentService: '[StudentService.updateStudent]',
  deleteStudentService: '[StudentService.deleteStudent]',

  //Schedule Service
  getTodayScheduleController: '[ScheduleController.getTodayScheduleController]',
  getCurrentScheduleController:
    '[ScheduleController.getCurrentScheduleController]',
  getScheduleListController:
    '[ScheduleController.getScheduleListController]',

  getTodayScheduleService: '[ScheduleService.getTodaySchedule]',
  getCurrentScheduleService: '[ScheduleService.getCurrentSchedule]',
  getScheduleListService: '[ScheduleService.getListSchedule]',

  //User Servicie
  updateUser: '[UserController.updateUser]'

  // add more
};
