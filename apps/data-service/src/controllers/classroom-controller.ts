import { Request, Response } from 'express';
import { JsonResponse } from '@siakad/express.server';
import { Logger, contextLogger, queryHelper, resMessage, } from '@siakad/express.utils';
import { ToSeqWhereClassroom } from '../params/classroom-params';
import { ClassroomService } from '../service/classroom-service';
import { QueryParamsDto } from '../utils/queryParams';
import { CreateClassroomDto } from '../interface/classroom-dto';
import { queryClassroomValidator } from '../utils/queryValidator';


export class ClassroomController {
    static async getClassroom(
        req: Request<queryClassroomValidator, {}, {}, QueryParamsDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const q: QueryParamsDto = req.query;
        const where = ToSeqWhereClassroom(q);
        const query = queryHelper(where, q.page, q.page_size)

        try {
            const { data: listClassroom, pagination } = await ClassroomService.getListClassroom(query);

            if (!listClassroom) {
                Logger.error(
                    `['ClassroomService.getListClassroom'] | Error: ${resMessage.emptyData}`
                );
                return JsonResponse(res, resMessage.emptyData, 'success', {
                    classroom: []
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

    static async patchClassroom(
        req: Request<{}, {}, CreateClassroomDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        try {
            const payload = req.body;
            const { data: classroom }  = await ClassroomService.patchClassroomByID(payload);
            if (!classroom || Object.keys(classroom).length === 0) {
                Logger.info(`${contextLogger.patchClassroomController} | No rows affected`);
                return JsonResponse(res, resMessage.emptyData, 'success', { classroom: [] });
            }
    
            Logger.error(`${contextLogger.patchClassroomController} | Successfully updated classroom`);
            return JsonResponse(res, resMessage.success, 'success', classroom);
        } catch (error) {
            const errorMessage = `${contextLogger.patchClassroomController} | Error: ${error.message}`;
            Logger.error(errorMessage);
            return res.boom.badImplementation();
        }
    }

    static async deleteClassroom(
        req: Request,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const id: string = req.query.id as string;
        try {
            const { data: classroom }  = await ClassroomService.deleteClassroomByID(id);
            if (!classroom || Object.keys(classroom).length === 0) {
                Logger.info(`${contextLogger.deleteClassroomController} | Successfully deleted classroom`);
                return JsonResponse(res, resMessage.deleted, 'success', { classroom: [] });
            }
    
            Logger.info(`${contextLogger.deleteClassroomController} | No rows affected`);
            return JsonResponse(res, resMessage.success, 'success', { classroom });
        } catch (error) {
            const errorMessage = `${contextLogger.deleteClassroomController} | Error: ${error.message}`;
            Logger.error(errorMessage);
            return res.boom.badImplementation();
        }
    }
    
}
