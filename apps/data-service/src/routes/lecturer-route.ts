import { Router } from 'express';
import { LecturerController } from '../controllers/lecturer-controller';

const lecturerRoute = Router();

lecturerRoute.route('/').get(LecturerController.getLecturer);
lecturerRoute.route('/').patch(LecturerController.patchLecturer);

export default lecturerRoute;
