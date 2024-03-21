import { Router } from 'express';
import { ClassController } from '../controllers/class-controller';

const classRoute = Router();

classRoute.route('/').get(ClassController.getClass);

export default classRoute;
