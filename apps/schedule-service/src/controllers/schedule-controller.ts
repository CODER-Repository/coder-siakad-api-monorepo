import { Request, Response } from 'express';
import { BaseResponse, JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger } from '@siakad/express.utils';
import { ScheduleService } from '../service/schedule-service';
export class ScheduleController {
  static async getCurrentSchedule(
    req: Request<{}, {}, {}, {}>,
    res: Response
  ): Promise<void> {
    try {
      const schedules = await ScheduleService.getCurrentSchedule();
      if (!schedules) {
        Logger.error(
          `${contextLogger.getCurrentScheduleController} | Error: ${resMessage.emptyData}`
        );
        JsonResponse(res, 200, resMessage.emptyData, {});
        return;
      }

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

      JsonResponse(res, 200, resMessage.emptyData, {
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
}
