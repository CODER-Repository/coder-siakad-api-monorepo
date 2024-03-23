import { Router } from 'express';
import { CourseController } from '../controllers/course-controller';

const classRoute = Router();

classRoute.route('/').get(CourseController.getCourse);

export default classRoute;
