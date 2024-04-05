import { Request, Response } from 'express';

import { BaseResponse, JsonResponse } from '@siakad/express.server';
import { Logger, contextLogger, queryHelper, resMessage } from '@siakad/express.utils';
import { KRSService } from '../service/krs-service';
import { queryKhsValidator } from '../utils/queryValidator';
import { QueryParamsDto } from '../utils/queryParams';
import { ToSeqWhereKHS } from '../params/khs-params';

export class KRSController {
    static async showKRS(req: Request, res: Response) {
        const context = '[KRSController.showKRS]';
        try {
            const krs = await KRSService.showKRS();
            return res.json(
                BaseResponse.successResponse(krs, 'KRS retrieved successfully')
            );
        } catch (error) {
            Logger.error(`${context} | Error: ${error.message}`);
            return res.boom.badImplementation();
        }
    }

    static async showKHS(
        req: Request<queryKhsValidator, {}, {}, QueryParamsDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const q: QueryParamsDto = req.query;
        const where = ToSeqWhereKHS(q);
        const query = queryHelper(where, q.page, q.page_size)

        try {
            const { data: listCourses, pagination} = await KRSService.getListKHS(query);

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
