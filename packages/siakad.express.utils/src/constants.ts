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

export const PORT_SERVICE = {
  authService: 5001,
  mockService: 5002,
  userService: 5003,
  paymentService: 5004,
  scheduleService: 5005
  // add more
};

export const resMessage = {
  badImplementation: 'Internal Server Error',
  badRequest: 'Invalid input payload',
  notFound: 'Data not found',
  emptyData: 'Data is empty',
  success: 'Successfully',
  validationRole: 'Role is not allowed'
  // add more
};

export const contextLogger = {
  //Auth Service
  userRegister: '[AuthController.registerUser]',
  userLogin: '[AuthController.login]',

  //Schedule Service
  getSchedule: '[ScheduleController.getSchedule]',
  getScheduleByUserId: '[ScheduleController.getScheduleByUserId]',

  //User Servicie
  updateUser: '[UserController.updateUser]'

  // add more
};
