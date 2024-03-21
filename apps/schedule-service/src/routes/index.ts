import scheduleRouter from './schedule-route';
import classRouter from './class-route';
import lecturerRoute from './lecturer-route';

const basePath = '/api/v1'

export const routes = [
  { path: `${basePath}/schedule`, router: scheduleRouter },
  { path: `${basePath}/class`, router: classRouter },
  { path: `${basePath}/lecturer`, router: lecturerRoute }
];

