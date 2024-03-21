import scheduleRouter from './schedule-route';

const basePath = '/api/v1'

export const routes = [
  { path: `${basePath}/schedule`, router: scheduleRouter },
];

