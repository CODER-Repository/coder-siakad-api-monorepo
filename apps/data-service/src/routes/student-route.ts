import { Router } from 'express';
import { StudentController } from '../controllers/student-controller';

const classRoute = Router();

classRoute.route('/').get(StudentController.getStudent);
classRoute.route('/').delete(StudentController.deleteStudent);
classRoute.route('/').patch(StudentController.patchStudent);

export default classRoute;
