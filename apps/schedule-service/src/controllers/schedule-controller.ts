import { Request, Response } from 'express';
import { JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger } from '@siakad/express.utils';
import { ScheduleService } from '../service/schedule-service';
import { PaginateOption, QueryParamsDto } from '../utils/queryParams';
import { ToSqlWhere } from '../params/scheduler-params';

export class ScheduleController {
    static async getCurrentSchedule(
        //params, body, query, headers
        req: Request<{}, {}, {}, {}>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        try {
            const schedules = await ScheduleService.getCurrentSchedule(req.user.nim);
            if (!schedules) {
                Logger.error(
                    `${contextLogger.getCurrentScheduleController} | Error: ${resMessage.emptyData}`
                );
                return JsonResponse(res, resMessage.emptyData, 'success', []);
            }

            Logger.info(
                `${contextLogger.getCurrentScheduleController} | ${resMessage.success}`
            );
            return JsonResponse(res, resMessage.success, 'success', schedules);
        } catch (error) {
            Logger.error(
                `${contextLogger.getCurrentScheduleController} | Error: ${error.message}`
            );
            return res.boom.badImplementation();
        }
    }

    static async getTodaySchedule(
        req: Request<{}, {}, {}, {}>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        try {
            const todaySchedule = await ScheduleService.getTodaySchedule();

            if (!todaySchedule) {
                Logger.error(
                    `${contextLogger.getTodayScheduleController} | Error: ${resMessage.emptyData}`
                );
                return JsonResponse(res, resMessage.emptyData, 'success', {
                    date: new Date().toISOString(),
                    schedule: []
                });
            }

            Logger.info(
                `${contextLogger.getTodayScheduleController} | ${resMessage.success}`
            );
            return JsonResponse(res, resMessage.success, 'success', {
                date: new Date().toISOString(),
                schedule: todaySchedule
            });
        } catch (error) {
            Logger.error(
                `${contextLogger.getTodayScheduleController} | Error: ${error.message}`
            );
            return res.boom.badImplementation();
        }
    }

    static async getScheduleList(
        req: Request<{}, {}, {}, QueryParamsDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const q: QueryParamsDto = req.query;
        const paginate = new PaginateOption();
        const pageOptions = {
            page: (q.page < 0 ? 0 : q.page) || 0,
            size: (q.size < 0 || q.size > paginate.MaxSize ? paginate.MaxSize : q.size) || paginate.MaxSize
        };

        const pagination = {
            totalCount: 0,
            totalPage: 0,
            page: pageOptions.page,
            size: pageOptions.size
        };

        const where = ToSqlWhere(q);
        const query = {
            where,
            limit: pageOptions.size,
            offset: (pageOptions.page - 1) * pageOptions.size
        };

        try {
            const response = await ScheduleService.getScheduleList(query);

            if (!response) {
                Logger.error(
                    `${contextLogger.getScheduleListController} | Error: ${resMessage.emptyData}`
                );
                return JsonResponse(res, resMessage.emptyData, 'success', {
                    data: []
                });
            }

            Logger.info(
                `${contextLogger.getScheduleListController} | ${resMessage.success}`
            );
            return JsonResponse(res, resMessage.success, 'success', {
                scheduleList: response,
                pagination
            });
        } catch (error) {
            Logger.error(
                `${contextLogger.getScheduleListController} | Error: ${error.message}`
            );
            return res.boom.badImplementation();
        }
    }
}
