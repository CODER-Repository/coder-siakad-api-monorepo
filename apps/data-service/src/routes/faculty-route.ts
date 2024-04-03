import { Router } from 'express';
import { FacultyController } from '../controllers/faculty-controller';

const facultyRoute = Router();

facultyRoute.route('/').get(FacultyController.getFaculty);


export default facultyRoute;
