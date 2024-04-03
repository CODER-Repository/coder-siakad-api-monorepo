import { Request, Response } from 'express';
import { JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger, queryHelper, ROLE_ID } from '@siakad/express.utils';
import { QueryParamsDto } from '../utils/queryParams';
import { ToSeqWhereCourse } from '../params/course-params';
import { CourseService } from '../service/course-service';
import { queryCourseValidator } from '../utils/queryValidator';
import { CreateCourseDto } from '../interface/course-dto';

export class CourseController {
    static async getCourse(
        req: Request<queryCourseValidator, {}, {}, QueryParamsDto>,
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

    static async patchCourse(
        req: Request<{}, {}, CreateCourseDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        try {
            const payload = req.body;
            const { data: course }  = await CourseService.patchCourseByID(payload);
            if (!course || Object.keys(course).length === 0) {
                Logger.info(`${contextLogger.patchCourseController} | No rows affected`);
                return JsonResponse(res, resMessage.emptyData, 'success', { course: [] });
            }
    
            Logger.error(`${contextLogger.patchCourseController} | Successfully updated course`);
            return JsonResponse(res, resMessage.success, 'success', { course });
        } catch (error) {
            const errorMessage = `${contextLogger.patchCourseController} | Error: ${error.message}`;
            Logger.error(errorMessage);
            return res.boom.badImplementation();
        }
    }

    static async deleteCourse(
        req: Request,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const id: string = req.query.id as string;
        try {
            const { data: course }  = await CourseService.deleteCourseByID(id);
            if (!course || Object.keys(course).length === 0) {
                Logger.info(`${contextLogger.deleteCourseController} | No rows affected`);
                return JsonResponse(res, resMessage.emptyData, 'success', { course: [] });
            }
    
            Logger.info(`${contextLogger.deleteCourseController} | Successfully deleted course`);
            return JsonResponse(res, resMessage.success, 'success', { course });
        } catch (error) {
            const errorMessage = `${contextLogger.deleteCourseController} | Error: ${error.message}`;
            Logger.error(errorMessage);
            return res.boom.badImplementation();
        }
    }
}
