import { Request, Response } from 'express';
import { JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger, queryHelper, ROLE_ID } from '@siakad/express.utils';
import { QueryParamsDto } from '../utils/queryParams';
import { ToSeqWhereCourse } from '../params/course-params';
import { CourseService } from '../service/course-service';
import { queryCourseValidator } from '../utils/queryValidator';

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

    static async deleteCourse(
        req: Request<queryCourseValidator, {}, {}>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const UserAuth = req.user as unknown as string;
        const { roleId } = JSON.parse(UserAuth);
        const id: string = req.query.id as string;
        try {
            if (roleId !== ROLE_ID.Admin) {
                Logger.error(`${contextLogger.deleteCourseController} | Error: ${resMessage.emptyData}`);
                return res.boom.forbidden(resMessage.validationRole)
            }

            const { data: course }  = await CourseService.deleteCourseByID(id);
            if (!course || Object.keys(course).length === 0) {
                Logger.error(`${contextLogger.deleteCourseController} | No rows affected`);
                return JsonResponse(res, resMessage.emptyData, 'success', { course: [] });
            }
    
            Logger.error(`${contextLogger.deleteCourseController} | Successfully deleted course`);
            return JsonResponse(res, resMessage.success, 'success', { course });
        } catch (error) {
            const errorMessage = `${contextLogger.deleteCourseController} | Error: ${error.message}`;
            Logger.error(errorMessage);
            return res.boom.badImplementation();
        }
    }
}
