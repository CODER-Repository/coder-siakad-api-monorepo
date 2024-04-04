import { Request, Response } from 'express';
import { JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger, queryHelper } from '@siakad/express.utils';
import { QueryParamsDto } from '../utils/queryParams';
import { queryFacultyValidator } from '../utils/queryValidator';
import { ToSeqWhereFaculty } from '../params/faculty-params';
import { FacultyService } from '../service/faculty-service';
import { CreateFacultyDto } from '../interface/faculty-dto';

export class FacultyController {
    static async getFaculty(
        req: Request<queryFacultyValidator, {}, {}, QueryParamsDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const q: QueryParamsDto = req.query;
        const where = ToSeqWhereFaculty(q);
        const query = queryHelper(where, q.page, q.page_size)

        try {
            const { data: listFaculty, pagination} = await FacultyService.getListFaculty(query);

            if (!listFaculty) {
                Logger.error(
                    `${contextLogger.getFacultyController} | Error: ${resMessage.emptyData}`
                );
                return JsonResponse(res, resMessage.emptyData, 'success', { faculty: [] });
            }

            Logger.info(`${contextLogger.getFacultyController} | ${resMessage.success}`);
            JsonResponse(res, resMessage.success, 'success', { listFaculty, pagination });
        } catch (error) {
            Logger.error(
                `${contextLogger.getFacultyController} | Error: ${error.message}`
            );
            return res.boom.badImplementation();
        }
    }

    static async patchFaculty(
        req: Request<{}, {}, CreateFacultyDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        try {
            const payload = req.body;
            const { data: faculty }  = await FacultyService.patchFacultyByID(payload);
            if (!faculty || Object.keys(faculty).length === 0) {
                Logger.info(`${contextLogger.patchFacultyController} | No rows affected`);
                return JsonResponse(res, resMessage.emptyData, 'success', { faculty: [] });
            }
    
            Logger.info(`${contextLogger.patchFacultyController} | Successfully updated faculty`);
            return JsonResponse(res, resMessage.updated, 'success', faculty);
        } catch (error) {
            const errorMessage = `${contextLogger.patchFacultyController} | Error: ${error.message}`;
            Logger.error(errorMessage);
            return res.boom.badImplementation();
        }
    }

    static async deleteFaculty(
        req: Request,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const id: string = req.query.id as string;
        try {
            const { data: faculty }  = await FacultyService.deleteFacultyByID(id);
            if (!faculty || Object.keys(faculty).length === 0) {
                Logger.info(`${contextLogger.deleteCourseController} | Successfully deleted faculty`);
                return JsonResponse(res, resMessage.deleted, 'success', { faculty: [] });
            }
    
            return JsonResponse(res, resMessage.success, 'success', faculty);
        } catch (error) {
            const errorMessage = `${contextLogger.deleteCourseController} | Error: ${error.message}`;
            Logger.error(errorMessage);
            return res.boom.badImplementation();
        }
    }
}
