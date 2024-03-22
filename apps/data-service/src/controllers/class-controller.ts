import { Request, Response } from 'express';
import { JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger } from '@siakad/express.utils';
import { ClassService } from '../service/class-service';
import { PaginateOption, QueryParamsDto } from '../utils/queryParams';
import { ToSqlWhere } from '../params/class-params';

export class ClassController {
    private readonly paginate: PaginateOption;

    constructor(paginate: PaginateOption) {
        this.paginate = paginate;
    }

    static async getClass(
        req: Request<{}, {}, {}, QueryParamsDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const q: QueryParamsDto = req.query;
        const paginate = new PaginateOption();
        const pageOptions = {
            page: Math.max(0, q.page || 1),
            page_size: Math.min(paginate.MaxSize, Math.max(0, q.page_size || paginate.MaxSize))
        };

        const pagination = {
            totalCount: 0,
            totalPage: 0,
            page: pageOptions.page || 1,
            size: pageOptions.page_size
        };

        const where = ToSqlWhere(q);
        const query = {
            where,
            limit: pageOptions.page_size,
            offset: (pageOptions.page - 1) * pageOptions.page_size
        };

        try {
            const classResponse = await ClassService.getListClass(query);

            if (!classResponse) {
                Logger.error(
                    `${contextLogger.getClassController} | Error: ${resMessage.emptyData}`
                );
                return JsonResponse(res, resMessage.emptyData, 'success', {
                    class: []
                });
            }

            Logger.info(
                `${contextLogger.getClassController} | ${resMessage.success}`
            );
            JsonResponse(res, resMessage.success, 'success', {
                data: classResponse, pagination
            });
        } catch (error) {
            Logger.error(
                `${contextLogger.getClassController} | Error: ${error.message}`
            );
            return res.boom.badImplementation();
        }
    }
}
