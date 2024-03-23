import { Request, Response } from 'express';
import { JsonResponse } from '@siakad/express.server';
import { Logger, queryHelper, resMessage } from '@siakad/express.utils';
import { QueryParamsDto } from '../utils/queryParams';
import { ToSeqWhereStudent } from '../params/student-params';
import { StudentService } from '../service/student-service';

export class StudentController {
    static async getStudent(
        req: Request<{}, {}, {}, QueryParamsDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const q: QueryParamsDto = req.query;
        const where = ToSeqWhereStudent(q);
        const query = queryHelper(where, q.page, q.page_size)

        try {
            const { data: listStudent, pagination} = await StudentService.getListStudent(query);

            if (!listStudent) {
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
            return JsonResponse(res, resMessage.success, 'success', { listStudent, pagination });
        } catch (error) {
            Logger.error(
                `['StudentController.getListStudent'] | Error: ${error.message}`
            );
            return res.boom.badImplementation();
        }
    }
}
