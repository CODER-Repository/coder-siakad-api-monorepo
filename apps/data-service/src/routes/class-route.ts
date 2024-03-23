import { Router } from 'express';
import { ClassController } from '../controllers/class-controller';
// import { VerifyAuth } from '@siakad/express.server';

const classRoute = Router();

classRoute.route('/').get(ClassController.getClass);

export default classRoute;
