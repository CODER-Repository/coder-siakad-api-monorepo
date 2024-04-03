import { Router } from 'express';
import { CourseController } from '../controllers/course-controller';
import isAdmin from '../middleware';

const classRoute = Router();

classRoute.route('/').get(CourseController.getCourse);
classRoute.route('/').patch(isAdmin,CourseController.patchCourse);
classRoute.route('/').delete(isAdmin,CourseController.deleteCourse);

export default classRoute;
