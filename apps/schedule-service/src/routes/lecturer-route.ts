import { Router } from 'express';
import { LecturerController } from '../controllers/lecturer-controller';

const lecturerRoute = Router();

lecturerRoute.route('/').get(LecturerController.getLecturer);

export default lecturerRoute;
