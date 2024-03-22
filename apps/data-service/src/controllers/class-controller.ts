import { Request, Response } from 'express';
import { BaseResponse, JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger, queryHelper } from '@siakad/express.utils';
import { ClassService } from '../service/class-service';
import { PaginateOption, QueryParamsDto } from '../utils/queryParams';
import { ToSeqWhereClass } from '../params/class-params';

export class ClassController {
    private readonly paginate: PaginateOption;

    constructor(paginate: PaginateOption) {
        this.paginate = paginate;
    }

    static async getClass(
        req: Request<{}, {}, {}, QueryParamsDto>,
        res: Response
    ): Promise<void> {
        const q: QueryParamsDto = req.query;
        const where = ToSeqWhereClass(q);
        const query = queryHelper(where, q.page, q.page_size)

        try {
            const classResponse = await ClassService.getListClass(query);

            if (!classResponse) {
                Logger.error(
                    `${contextLogger.getClassController} | Error: ${resMessage.emptyData}`
                );
                JsonResponse(res, resMessage.emptyData, 'success', {
                    class: []
                });
                return;
            }

            Logger.info(
                `${contextLogger.getClassController} | ${resMessage.success}`
            );
            JsonResponse(res, resMessage.success, 'success', {
                data: classResponse
            });
        } catch (error) {
            Logger.error(
                `${contextLogger.getClassController} | Error: ${error.message}`
            );
            res.status(500).json(BaseResponse.internalServerErrorResponse());
            return;
        }
    }
}
