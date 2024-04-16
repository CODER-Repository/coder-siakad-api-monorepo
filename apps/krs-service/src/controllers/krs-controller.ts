import { Request, Response } from 'express';

import { BaseResponse, JsonResponse } from '@siakad/express.server';
import { Logger, contextLogger, queryHelper, resMessage } from '@siakad/express.utils';
import { KRSService } from '../service/krs-service';
import { queryKhsValidator } from '../utils/queryValidator';
import { QueryParamsDto } from '../utils/queryParams';
import { ToSeqWhereKHS } from '../params/khs-params';
import { UpdateGradeDto } from '../interface/khs-dto';

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
            const { data: listKHS, pagination} = await KRSService.getListKHS(query);

            if (!listKHS) {
                Logger.error(`${contextLogger.getKHSController} | Error: ${resMessage.emptyData}`
                );
                return JsonResponse(res, resMessage.emptyData, 'success', { khs: [] });
            }

            Logger.info(`${contextLogger.getKHSController} | ${resMessage.success}`);
            JsonResponse(res, resMessage.success, 'success', { listKHS, pagination });
        } catch (error) {
            Logger.error(`${contextLogger.getKHSController} | Error: ${error.message}`
            );
            return res.boom.badImplementation();
        }
    }

    static async patchKHSGrade(
        req: Request<{}, {}, UpdateGradeDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        try {
            const payload = req.body;
            const { data: grades }  = await KRSService.updateGradeByID(payload);
            if (!grades || Object.keys(grades).length === 0) {
                Logger.info(`${contextLogger.patchKHSGradeController} | No rows affected`);
                return JsonResponse(res, resMessage.emptyData, 'success', { grades: [] });
            }
    
            Logger.info(`${contextLogger.patchKHSGradeController} | Successfully updated listKHS`);
            return JsonResponse(res, resMessage.updated, 'success', grades );
        } catch (error) {
            const errorMessage = `${contextLogger.patchKHSGradeController} | Error: ${error.message}`;
            Logger.error(errorMessage);
            return res.boom.badImplementation();
        }
    }
}
