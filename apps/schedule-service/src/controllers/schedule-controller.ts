import { Request, Response } from 'express';
import { BaseResponse, JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger, getUserFromToken } from '@siakad/express.utils';
import { ScheduleService } from '../service/schedule-service';
import { PaginateOption, QueryParamsDto } from '../utils/queryParams';
import { ToSeqWhere } from '../params/scheduler-params';

export class ScheduleController {
  private readonly paginate: PaginateOption;

  constructor(paginate: PaginateOption) {
    this.paginate = paginate;
  }

  static async getCurrentSchedule(
    //params, body, query, headers
    req: Request<{}, {}, {}, {}>,
    res: Response
  ): Promise<void> {
    const token = req.headers.authorization;
    const userAuth = getUserFromToken(token);
    
    if (!userAuth.email) {
      Logger.error(`${contextLogger.getCurrentScheduleController} | Error: Invalid query parameters`);
      JsonResponse(res, resMessage.forbidden, 'unauthorized');
      return;
    }

    try {
      const schedules = await ScheduleService.getCurrentSchedule();
      if (!schedules) {
        Logger.error(
          `${contextLogger.getCurrentScheduleController} | Error: ${resMessage.emptyData}`
        );
        JsonResponse(res, resMessage.emptyData, 'success', []);
        return;
      }

      Logger.info(
        `${contextLogger.getCurrentScheduleController} | ${resMessage.success}`
      );
      JsonResponse(res, resMessage.success, 'success', schedules);
    } catch (error) {
      Logger.error(
        `${contextLogger.getCurrentScheduleController} | Error: ${error.message}`
      );
      JsonResponse(res, resMessage.badImplementation, 'internalServerError', []);
      return;
    }
  }

  static async getTodaySchedule(
    req: Request<{}, {}, {}, {}>,
    res: Response
  ): Promise<void> {
    try {
      const todaySchedule = await ScheduleService.getTodaySchedule();

      if (!todaySchedule) {
        Logger.error(
          `${contextLogger.getTodayScheduleController} | Error: ${resMessage.emptyData}`
        );
        JsonResponse(res, resMessage.emptyData, 'success',{
          date: new Date().toISOString(),
          schedule: []
        });
        return;
      }

      Logger.info(
        `${contextLogger.getTodayScheduleController} | ${resMessage.success}`
      );
      JsonResponse(res, resMessage.success, 'success', {
        date: new Date().toISOString(),
        schedule: todaySchedule
      });
    } catch (error) {
      Logger.error(
        `${contextLogger.getTodayScheduleController} | Error: ${error.message}`
      );
      res.status(500).json(BaseResponse.internalServerErrorResponse());
      return;
    }
  }

  static async getScheduleList(
    req: Request<{}, {}, {}, QueryParamsDto>,
    res: Response
  ): Promise<void> {
    const q: QueryParamsDto = req.query;
    const paginate = new PaginateOption();
    const pageOptions = {
      page: (q.page < 0 ? 0 : q.page) || 0,
      size: (q.size < 0 || q.size > paginate.MaxSize ? paginate.MaxSize : q.size) || paginate.MaxSize,
    };

    const pagination = {
      totalCount: 0,
      totalPage: 0,
      page: pageOptions.page,
      size: pageOptions.size,
    };

    const where = ToSeqWhere(q);
    const query = {
      where,
      limit: pageOptions.size,
      offset: (pageOptions.page - 1)* pageOptions.size,
    };

    try {

      const response = await ScheduleService.getScheduleList(query);

      if (!response) {
        Logger.error(
          `${contextLogger.getScheduleListController} | Error: ${resMessage.emptyData}`
        );
        JsonResponse(res, resMessage.emptyData, 'success', {
          data: []
        });
        return;
      }

      Logger.info(
        `${contextLogger.getScheduleListController} | ${resMessage.success}`
      );
      JsonResponse(res, resMessage.success, 'success', {
        scheduleList: response,
        pagination
      });
    } catch (error) {
      Logger.error(
        `${contextLogger.getScheduleListController} | Error: ${error.message}`
      );
      res.status(500).json(BaseResponse.internalServerErrorResponse());
      return;
    }
  }
}
