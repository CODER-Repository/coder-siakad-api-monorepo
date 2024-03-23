import { Router } from 'express';
import { LecturerController } from '../controllers/lecturer-controller';
import { VerifyAuth } from '@siakad/express.server';

const lecturerRoute = Router();

lecturerRoute.route('/').get(VerifyAuth, LecturerController.getLecturer);

export default lecturerRoute;
