import { Request, Response } from 'express';
import { JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger, queryHelper } from '@siakad/express.utils';
import { QueryParamsDto } from '../utils/queryParams';
import { queryFacultyValidator } from '../utils/queryValidator';
import { ToSeqWhereFaculty } from '../params/faculty-params';
import { FacultyService } from '../service/faculty-service';

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
}
