import { Request, Response } from 'express';
import { JsonResponse } from '@siakad/express.server';
import { Logger, resMessage } from '@siakad/express.utils';
import { PaginateOption, QueryParamsDto } from '../utils/queryParams';
import { ToSqlWhere } from '../params/student-params';
import { StudentService } from '../service/student-service';

export class StudentController {
    static async getStudent(
        req: Request<{}, {}, {}, QueryParamsDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const q: QueryParamsDto = req.query;
        const paginate = new PaginateOption();
        const pageOptions = {
            page: Math.max(0, q.page || 1),
            page_size: Math.min(paginate.MaxSize, Math.max(0, q.size || paginate.MaxSize))
        };

        const pagination = {
            totalCount: 0,
            totalPage: 0,
            page: pageOptions.page,
            size: pageOptions.page_size
        };

        const where = ToSqlWhere(q);
        const query = {
            where,
            limit: pageOptions.page_size,
            offset: (pageOptions.page - 1) * pageOptions.page_size
        };

        try {
            const studentResponse = await StudentService.getListStudent(query);

            if (!studentResponse) {
                Logger.error(
                    `['StudentController.getListStudent']| Error: ${resMessage.emptyData}`
                );
                return JsonResponse(res, resMessage.emptyData, 'success', {
                    class: []
                });
            }

            Logger.info(
                `['StudentController.getListStudent'] | ${resMessage.success}`
            );
            return JsonResponse(res, resMessage.success, 'success', {
                data: studentResponse, pagination
            });
        } catch (error) {
            Logger.error(
                `['StudentController.getListStudent'] | Error: ${error.message}`
            );
            return res.boom.badImplementation();
        }
    }
}
