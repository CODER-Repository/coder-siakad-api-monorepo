import { Request, Response } from 'express';
import { JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger, queryHelper } from '@siakad/express.utils';
import { LecturerService } from '../service/lecturer-service';
import { QueryParamsDto } from '../utils/queryParams';
import { ToSeqWhereLecturer } from '../params/lecturer-params';

export class LecturerController {
    static async getLecturer(
        req: Request<{}, {}, {}, QueryParamsDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        try {
            const q: QueryParamsDto = req.query;
            const where = ToSeqWhereLecturer(q);
            const query = queryHelper(where, q.page, q.page_size)

            const { data: listLecturer, pagination}= await LecturerService.getListLecturer(query);

            if (!listLecturer) {
                Logger.error(
                    `${contextLogger.getLecturerController} 
                    | Error: ${resMessage.emptyData}`
                );
                JsonResponse(res, resMessage.emptyData, 'success', { lecturer: [] });
                return;
            }

            Logger.info(`${contextLogger.getLecturerController} | ${resMessage.success}`);
            JsonResponse(res, resMessage.success, 'success', { listLecturer, pagination });
        } catch (error) {
            Logger.error(
                `${contextLogger.getLecturerController} 
                | Error: ${error.message}`
            );
            return res.boom.badImplementation();
        }
    }
}
