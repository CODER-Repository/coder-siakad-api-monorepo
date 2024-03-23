import { Router } from 'express';
import { StudentController } from '../controllers/student-controller';
import { VerifyAuth } from '@siakad/express.server';

const classRoute = Router();

classRoute.route('/').get(VerifyAuth, StudentController.getStudent);

export default classRoute;
