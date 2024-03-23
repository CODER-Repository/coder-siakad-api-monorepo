import { Router } from 'express';
import { StudentController } from '../controllers/student-controller';

const classRoute = Router();

classRoute.route('/').get(StudentController.getStudent);

export default classRoute;
