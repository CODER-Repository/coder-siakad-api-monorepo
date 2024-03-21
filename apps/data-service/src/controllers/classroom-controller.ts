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
            page_size: Math.min(paginate.MaxSize, Math.max(0, q.page_size || paginate.MaxSize))
        };

        const pagination = {
            totalCount: 0,
            totalPage: 0,
            page: pageOptions.page,
            size: pageOptions.page_size
        };

        const where = ToSeqWhere(q);
        const query = {
            where,
            limit: pageOptions.page_size,
            offset: (pageOptions.page - 1) * pageOptions.page_size
        };

        try {
            const classroomResponse = await ClassroomService.getListClassroom(query);

            if (!classroomResponse) {
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
                data: classroomResponse, pagination
            });
        } catch (error) {
            Logger.error(
                `['ClassroomService.getListStudent'] | Error: ${error.message}`
            );
            return res.boom.badImplementation();
        }
    }
}
