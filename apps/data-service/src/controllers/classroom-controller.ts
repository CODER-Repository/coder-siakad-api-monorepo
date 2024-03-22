import { Request, Response } from 'express';
import { JsonResponse } from '@siakad/express.server';
import { Logger, queryHelper, resMessage, } from '@siakad/express.utils';
import { ToSeqWhere } from '../params/classroom-params';
import { ClassroomService } from '../service/classroom-service';
import { QueryParamsDto } from '../utils/queryParams';


export class ClassroomController {
    static async getClassroom(
        req: Request<{}, {}, {}, QueryParamsDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const q: QueryParamsDto = req.query;
        const where = ToSeqWhere(q);
        const query = queryHelper(where, q.page, q.page_size)

        try {
            const { listClassroom, pagination } = await ClassroomService.getListClassroom(query);

            if (!listClassroom) {
                Logger.error(
                    `['ClassroomService.getListClassroom'] | Error: ${resMessage.emptyData}`
                );
                return JsonResponse(res, resMessage.emptyData, 'success', {
                    class: []
                });
            }

            Logger.info(
                `['ClassroomService.getListClassroom'] | ${resMessage.success}`
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
