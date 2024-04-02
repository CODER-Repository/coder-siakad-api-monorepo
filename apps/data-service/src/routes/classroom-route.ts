import { Router } from 'express';
import { ClassroomController } from '../controllers/classroom-controller';
import isAdmin from '../middleware';

const classRoute = Router();

classRoute.route('/').get(ClassroomController.getClassroom);
classRoute.route('/').patch(isAdmin,ClassroomController.patchClassroom);
classRoute.route('/').delete(isAdmin,ClassroomController.deleteClassroom);

export default classRoute;
