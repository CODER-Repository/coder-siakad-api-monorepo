import { Router } from 'express';
import { ClassController } from '../controllers/class-controller';
import { VerifyAuth } from '@siakad/express.server';

const classRoute = Router();

classRoute.route('/').get(VerifyAuth, ClassController.getClass);

export default classRoute;
