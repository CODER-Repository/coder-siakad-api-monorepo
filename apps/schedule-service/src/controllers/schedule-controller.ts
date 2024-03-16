import { Request, Response } from 'express';
import { BaseResponse, JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger } from '@siakad/express.utils';
import { ScheduleService } from '../service/schedule-service';
import { queryValidator } from '../utils/queryValidator';
export class ScheduleController {
  static async getCurrentSchedule(
    //params, body, query, headers
    req: Request<{}, {}, typeof queryValidator, {}>,
    res: Response
  ): Promise<void> {
    const { nim } = req.query as typeof queryValidator;
    if (!nim) {
      Logger.error(`${contextLogger.getCurrentScheduleController} | Error: Invalid query parameters`);
      JsonResponse(res, 400, 'Query parameters nim are required', {});
      return;
    }

    try {
      const schedules = await ScheduleService.getCurrentSchedule(nim);
      if (!schedules) {
        Logger.error(
          `${contextLogger.getCurrentScheduleController} | Error: ${resMessage.emptyData}`
        );
        JsonResponse(res, 200, resMessage.emptyData, {});
        return;
      }

      Logger.info(
        `${contextLogger.getCurrentScheduleController} | ${resMessage.success}`
      );
      JsonResponse(res, 200, resMessage.success, schedules);
    } catch (error) {
      Logger.error(
        `${contextLogger.getCurrentScheduleController} | Error: ${error.message}`
      );
      res.boom.badImplementation(resMessage.badImplementation);
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
        JsonResponse(res, 200, resMessage.emptyData, {
          date: new Date().toISOString(),
          schedule: []
        });
        return;
      }

      Logger.info(
        `${contextLogger.getTodayScheduleController} | ${resMessage.success}`
      );
      JsonResponse(res, 200, resMessage.success, {
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
    req: Request<{}, {}, {}, {}>,
    res: Response
  ): Promise<void> {
    try {
      const response = await ScheduleService.getScheduleList();

      if (!response) {
        Logger.error(
          `${contextLogger.getScheduleListController} | Error: ${resMessage.emptyData}`
        );
        JsonResponse(res, 200, resMessage.emptyData, {
          data: []
        });
        return;
      }

      Logger.info(
        `${contextLogger.getScheduleListController} | ${resMessage.success}`
      );
      JsonResponse(res, 200, resMessage.success, {
        data: response
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
