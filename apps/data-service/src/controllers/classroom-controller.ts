import { Request, Response } from 'express';
import { JsonResponse } from '@siakad/express.server';
import { Logger, resMessage } from '@siakad/express.utils';
import { PaginateOption, QueryParamsDto } from '../utils/queryParams';
import { ToSeqWhere } from '../params/classroom-params';
import { ClassroomService } from '../service/classroom-service';

export class ClassroomController {
    static async getClassroom(
        req: Request<{}, {}, {}, QueryParamsDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const q: QueryParamsDto = req.query;
        const paginate = new PaginateOption();
        const pageOptions = {
            page: Math.max(0, q.page || 1),
            size: Math.min(paginate.MaxSize, Math.max(0, q.size || paginate.MaxSize))
        };

        const where = ToSeqWhere(q);
        const query = {
            where,
            limit: pageOptions.size,
            offset: (pageOptions.page - 1) * pageOptions.size
        };

        try {
            const { listClassroom, pagination } = await ClassroomService.getListClassroom(query);

            if (!listClassroom) {
                Logger.error(
                    `['ClassroomService.getListStudent'] | Error: ${resMessage.emptyData}`
                );
                return JsonResponse(res, resMessage.emptyData, 'success', {
                    class: []
                });
            }

            Logger.info(
                `['ClassroomService.getListStudent'] | ${resMessage.success}`
            );
            return JsonResponse(res, resMessage.success, 'success', {
                listClassroom, pagination
            });
        } catch (error) {
            Logger.error(
                `['ClassroomService.getListStudent'] | Error: ${error.message}`
            );
            return res.boom.badImplementation();
        }
    }
}
