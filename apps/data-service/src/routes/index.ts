import classRouter from './class-route';
import lecturerRoute from './lecturer-route';
import stundentRoute from './student-route';
import classroomRoute from './classroom-route';

const basePath = '/api/v1/data'

export const routes = [
  { path: `${basePath}/class`, router: classRouter },
  { path: `${basePath}/lecturer`, router: lecturerRoute },
  { path: `${basePath}/student`, router: stundentRoute },
  { path: `${basePath}/classroom`, router: classroomRoute },
];

