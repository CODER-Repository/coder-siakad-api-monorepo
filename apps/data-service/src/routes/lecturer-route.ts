import { Router } from 'express';
import { LecturerController } from '../controllers/lecturer-controller';
import isAdmin from '../middleware';

const lecturerRoute = Router();

lecturerRoute.route('/').get(LecturerController.getLecturer);
lecturerRoute.route('/').patch(isAdmin,LecturerController.patchLecturer);
lecturerRoute.route('/').delete(isAdmin,LecturerController.deleteLecturer);

export default lecturerRoute;
