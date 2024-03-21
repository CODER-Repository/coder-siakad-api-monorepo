import { Router } from 'express';
import { ClassroomController } from '../controllers/classroom-controller';

const classRoute = Router();

classRoute.route('/').get(ClassroomController.getClassroom);

export default classRoute;
