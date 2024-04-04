import { Request, Response } from 'express';
import { JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger } from '@siakad/express.utils';
import { ScheduleService } from '../service/schedule-service';
import { PaginateOption, QueryParamsDto } from '../utils/queryParams';
import { ToSqlWhere } from '../params/scheduler-params';
import { Day } from '@siakad/express.database/dist/entities/schedule.entity';

export class ScheduleController {
    static async getCurrentSchedule(
        req: Request<{}, {}, {}, {}>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const UserAuth = req.user as unknown as string;
        const { nim } = JSON.parse(UserAuth);

        try {
            const schedules = await ScheduleService.getCurrentSchedule(nim);
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
        const UserAuth = req.user as unknown as string;
        const { nim } = JSON.parse(UserAuth);
        const today: Day = new Date()
                .toLocaleString('en-US', { weekday: 'long' })
                .toLocaleLowerCase() as Day;
        try {
            const todaySchedule = await ScheduleService.getTodaySchedule(nim);

            if (!todaySchedule) {
                Logger.error(
                    `${contextLogger.getTodayScheduleController} | Error: ${resMessage.emptyData}`
                );
                return JsonResponse(res, resMessage.emptyData, 'success', {
                    day: today,
                    schedule: []
                });
            }

            Logger.info(
                `${contextLogger.getTodayScheduleController} | ${resMessage.success}`
            );
            return JsonResponse(res, resMessage.success, 'success', {
                day: today,
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
        req: Request<{}, {}, {}, {}>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const q = req.query as QueryParamsDto;
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
