import { Request, Response } from 'express';
import { JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger, queryHelper } from '@siakad/express.utils';
import { ClassService } from '../service/class-service';
import { QueryParamsDto } from '../utils/queryParams';
import { ToSeqWhereClass } from '../params/class-params';
import { CreateClassDto } from '../interface/class-dto';

export class ClassController {
    static async getClass(
        req: Request<{}, {}, {}, QueryParamsDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const q: QueryParamsDto = req.query;
        const where = ToSeqWhereClass(q);
        const query = queryHelper(where, q.page, q.page_size)

        try {
            const { data: listClass, pagination} = await ClassService.getListClass(query);

            if (!listClass) {
                Logger.error(
                    `${contextLogger.getClassController} 
                    | Error: ${resMessage.emptyData}`
                );
                return JsonResponse(res, resMessage.emptyData, 'success', { class: [] });
            }

            Logger.info(`${contextLogger.getClassController} | ${resMessage.success}`);
            JsonResponse(res, resMessage.success, 'success', {
                listClass, pagination,
            });
        } catch (error) {
            Logger.error(
                `${contextLogger.getClassController} 
                | Error: ${error.message}`
            );
            return res.boom.badImplementation();
        }
    }

    static async patchClass(
        req: Request<{}, {}, CreateClassDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        try {
            const payload = req.body;
            const { data: classDetail }  = await ClassService.updateDetailClass(payload);
            if (!classDetail || Object.keys(classDetail).length === 0) {
                Logger.info(`${contextLogger.patchClassController} | No rows affected`);
                return JsonResponse(res, resMessage.emptyData, 'success', { class: [] });
            }
    
            Logger.error(`${contextLogger.patchClassController} | Successfully updated class`);
            return JsonResponse(res, resMessage.success, 'success', classDetail);
        } catch (error) {
            const errorMessage = `${contextLogger.patchClassController} | Error: ${error.message}`;
            Logger.error(errorMessage);
            return res.boom.badImplementation();
        }
    }
}

