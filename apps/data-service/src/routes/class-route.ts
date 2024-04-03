import { Router } from 'express';
import { ClassController } from '../controllers/class-controller';
import isAdmin from '../middleware';

const classRoute = Router();

classRoute.route('/').get(ClassController.getClass);
classRoute.route('/').patch(isAdmin,ClassController.patchClass);

export default classRoute;
