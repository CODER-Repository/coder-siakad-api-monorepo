import { Request, Response } from 'express';
import { JsonResponse } from '@siakad/express.server';
import { Logger, ROLE_ID, contextLogger, queryHelper, resMessage } from '@siakad/express.utils';
import { QueryParamsDto } from '../utils/queryParams';
import { ToSeqWhereStudent } from '../params/student-params';
import { StudentService } from '../service/student-service';
import { queryStudentValidator } from '../utils/queryValidator';
import { CreateStudentDto } from '../interface/student-dto';

export class StudentController {
    static async getStudent(
        req: Request<queryStudentValidator, {}, {}, QueryParamsDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const q: QueryParamsDto = req.query;
        const where = ToSeqWhereStudent(q);
        const query = queryHelper(where, q.page, q.page_size)

        try {
            const { data: listStudent, pagination} = await StudentService.getListStudent(query);

            if (!listStudent) {
                Logger.error(
                    `${contextLogger.getStudentController} 
                    | Error: ${resMessage.emptyData}`
                );
                return JsonResponse(res, resMessage.emptyData, 'success', { class: [] });
            }

            Logger.info(`${contextLogger.getStudentController} | ${resMessage.success}`);
            return JsonResponse(res, resMessage.success, 'success', { listStudent, pagination });
        } catch (error) {
            Logger.error(
                `${contextLogger.getStudentController} 
                | Error: ${error.message}`
            );
            return res.boom.badImplementation();
        }
    }

    static async patchStudent(
        req: Request<{}, {}, CreateStudentDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        try {
            const payload = req.body;
            const { data: student }  = await StudentService.patchStudentByUserID(payload);
            if (!student || Object.keys(student).length === 0) {
                Logger.info(`${contextLogger.patchStudentController} | No rows affected`);
                return JsonResponse(res, resMessage.emptyData, 'success', { student: [] });
            }
    
            Logger.error(`${contextLogger.patchStudentController} | Successfully updated student`);
            return JsonResponse(res, resMessage.updated, 'success', { student });
        } catch (error) {
            const errorMessage = `${contextLogger.patchStudentController} | Error: ${error.message}`;
            Logger.error(errorMessage);
            return res.boom.badImplementation();
        }
    }
    
    static async deleteStudent(
        req: Request,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const id: string = req.query.id as string;
        try {
            const { data: student }  = await StudentService.deleteStudentByUserID(id);
            if (!student || Object.keys(student).length === 0) {
                Logger.error(`${contextLogger.getStudentController} | Successfully deleted student`);
                return JsonResponse(res, resMessage.deleted, 'success', { student: [] });
            }
    
            Logger.error(`${contextLogger.deleteStudentController} | No rows affected`);
            return JsonResponse(res, resMessage.success, 'success', { student });
        } catch (error) {
            const errorMessage = `${contextLogger.deleteStudentController} | Error: ${error.message}`;
            Logger.error(errorMessage);
            return res.boom.badImplementation();
        }
    }
}
