import classRouter from './class-route';
import lecturerRoute from './lecturer-route';
import studentRoute from './student-route';
import classroomRoute from './classroom-route';

const basePath = '/api/v1/data';

export const routes = [
    { path: `${basePath}/class`, router: classRouter },
    { path: `${basePath}/lecturer`, router: lecturerRoute },
    { path: `${basePath}/student`, router: studentRoute },
    { path: `${basePath}/classroom`, router: classroomRoute }
];

