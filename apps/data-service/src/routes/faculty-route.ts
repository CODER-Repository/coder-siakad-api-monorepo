import { Router } from 'express';
import { FacultyController } from '../controllers/faculty-controller';

const facultyRoute = Router();

facultyRoute.route('/').get(FacultyController.getFaculty);
facultyRoute.route('/').patch(FacultyController.patchFaculty);
facultyRoute.route('/').delete(FacultyController.deleteFaculty);


export default facultyRoute;
