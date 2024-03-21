import { Request, Response } from 'express';
import { BaseResponse, JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger, getEmailFromToken } from '@siakad/express.utils';
import { ScheduleService } from '../service/schedule-service';
import { queryValidator } from '../utils/queryValidator';
export class ScheduleController {
  static async getCurrentSchedule(
    //params, body, query, headers
    req: Request<{}, {}, {}, {}>,
    res: Response
  ): Promise<void> {
    const token = req.headers.authorization;
    const userEmail = getEmailFromToken(token);
    console.log(userEmail);
    if (!userEmail) {
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
    req: Request<{}, {}, typeof queryValidator, {}>,
    res: Response
  ): Promise<void> {
    try {
      const { nim } = req.query as typeof queryValidator;
      const response = await ScheduleService.getScheduleList(nim);

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
