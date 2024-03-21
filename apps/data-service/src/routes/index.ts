import classRouter from './class-route';
import lecturerRoute from './lecturer-route';

const basePath = '/api/v1/data'

export const routes = [
  { path: `${basePath}/class`, router: classRouter },
  { path: `${basePath}/lecturer`, router: lecturerRoute }
];

