import { Request, Response } from 'express';
import { JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger, queryHelper } from '@siakad/express.utils';
import { ScheduleService } from '../service/schedule-service';
import { QueryParamsDto } from '../utils/queryParams';
import { Day } from '@siakad/express.database/dist/entities/schedule.entity';
import { ToSeqWhereSchedule } from '../params/scheduler-params';
import { queryValidator } from '../utils/queryValidator';

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
        req: Request<queryValidator, {}, {}, QueryParamsDto>,
        res: Response
    ): Promise<void | Express.BoomError<null>> {
        const q: QueryParamsDto = req.query;
        const where = ToSeqWhereSchedule(q);
        const query = queryHelper(where, q.page, q.page_size)

        try {
            const { data: scheduleList, pagination} = await ScheduleService.getScheduleList(query);

            if (!scheduleList) {
                Logger.error(`${contextLogger.getScheduleListController} | Error: ${resMessage.emptyData}`);
                return JsonResponse(res, resMessage.emptyData, 'success', { data: []});
            }

            Logger.info(`${contextLogger.getScheduleListController} | ${resMessage.success}`);
            return JsonResponse(res, resMessage.success, 'success', {
                scheduleList,
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
