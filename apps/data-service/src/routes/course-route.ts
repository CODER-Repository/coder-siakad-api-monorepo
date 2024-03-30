import { Router } from 'express';
import { CourseController } from '../controllers/course-controller';

const classRoute = Router();

classRoute.route('/').get(CourseController.getCourse);
classRoute.route('/').delete(CourseController.deleteCourse);

export default classRoute;
