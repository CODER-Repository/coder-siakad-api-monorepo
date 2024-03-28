import { Request, Response } from 'express';
import { JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger, queryHelper } from '@siakad/express.utils';
import { LecturerService } from '../service/lecturer-service';
import { QueryParamsDto } from '../utils/queryParams';
import { ToSeqWhereLecturer } from '../params/lecturer-params';
import { Lecturer } from '@siakad/express.database';
import { CreateLectureDto } from '../interface/lecturer-dto';

export class LecturerController {
    static async getLecturer(
        req: Request<{}, {}, {}, QueryParamsDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        try {
            const q: QueryParamsDto = req.query;
            const where = ToSeqWhereLecturer(q);
            const query = queryHelper(where, q.page, q.page_size)

            const { data: listLecturer, pagination } = await LecturerService.getListLecturer(query);

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

    static async patchLecturer(
        req: Request<{}, {}, CreateLectureDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const UserAuth = req.user as unknown as string;
        const { roleId } = JSON.parse(UserAuth);
        try {
            const payload = req.body;
            if (roleId !== 'LCT') {
                const errorMessage = `[LecturerController.patchLecturer] | Error: ${resMessage.emptyData}`;
                Logger.error(errorMessage);
                return res.boom.forbidden(resMessage.validationRole)
            }

            const { data: lecturer }  = await LecturerService.pacthLecurerByUserID(payload);
            if (!lecturer || Object.keys(lecturer).length === 0) {
                Logger.error(`${contextLogger.PatchLecturerController} | No rows affected`);
                return JsonResponse(res, resMessage.emptyData, 'success', { lecturer: [] });
            }
    
            Logger.error(`${contextLogger.PatchLecturerController} | Successfully updated lecturer`);
            return JsonResponse(res, resMessage.success, 'success', { lecturer });
        } catch (error) {
            const errorMessage = `${contextLogger.getLecturerController} | Error: ${error.message}`;
            Logger.error(errorMessage);
            return res.boom.badImplementation();
        }
    }

}