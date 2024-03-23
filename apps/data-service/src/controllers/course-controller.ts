import { Request, Response } from 'express';
import { JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger, queryHelper } from '@siakad/express.utils';
import { QueryParamsDto } from '../utils/queryParams';
import { ToSeqWhereCourse } from '../params/course-params';
import { CourseService } from '../service/course-service';

export class CourseController {
    static async getCourse(
        req: Request<{}, {}, {}, QueryParamsDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const q: QueryParamsDto = req.query;
        const where = ToSeqWhereCourse(q);
        const query = queryHelper(where, q.page, q.page_size)

        try {
            const { data: listCourses, pagination} = await CourseService.getListCourse(query);

            if (!listCourses) {
                Logger.error(
                    `${contextLogger.getCourseController} 
                    | Error: ${resMessage.emptyData}`
                );
                return JsonResponse(res, resMessage.emptyData, 'success', { course: [] });
            }

            Logger.info(`${contextLogger.getCourseController} | ${resMessage.success}`);
            JsonResponse(res, resMessage.success, 'success', { listCourses, pagination });
        } catch (error) {
            Logger.error(
                `${contextLogger.getCourseController} 
                | Error: ${error.message}`
            );
            return res.boom.badImplementation();
        }
    }
}
