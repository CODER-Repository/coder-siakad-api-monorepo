import { Router } from 'express';
import { FacultyController } from '../controllers/faculty-controller';

const facultyRoute = Router();

facultyRoute.route('/').get(FacultyController.getFaculty);
facultyRoute.route('/').patch(FacultyController.getFaculty);
facultyRoute.route('/').delete(FacultyController.getFaculty);


export default facultyRoute;
