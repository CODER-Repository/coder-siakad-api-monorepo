import { Router } from 'express';
import { CourseController } from '../controllers/course-controller';
import { VerifyAuth } from '@siakad/express.server';

const classRoute = Router();

classRoute.route('/').get(VerifyAuth, CourseController.getCourse);

export default classRoute;
