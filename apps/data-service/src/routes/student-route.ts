import { Router } from 'express';
import { StudentController } from '../controllers/student-controller';
import isAdmin from '../middleware';

const classRoute = Router();

classRoute.route('/').get(StudentController.getStudent);
classRoute.route('/').delete(isAdmin,StudentController.deleteStudent);
classRoute.route('/').patch(isAdmin,StudentController.patchStudent);

export default classRoute;
