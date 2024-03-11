import { Request, Response } from 'express';
import { BaseResponse } from '@siakad/express.server';
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
          `${contextLogger.getCurrentScheduleController} | ${resMessage.emptyData}`
        );
        res
          .status(200)
          .json(BaseResponse.successResponse({}, resMessage.emptyData));
        return;
      }

      res
        .status(200)
        .json(BaseResponse.successResponse(schedules, resMessage.success));
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
      console.log(todaySchedule);

      if (!todaySchedule) {
        Logger.error(
          `${contextLogger.getCurrentScheduleController} | ${resMessage.emptyData}`
        );
        res
          .status(200)
          .json(BaseResponse.successResponse({}, resMessage.emptyData));
        return;
      }

      res
        .status(200)
        .json(BaseResponse.successResponse(todaySchedule, resMessage.success));
    } catch (error) {
      Logger.error(
        `${contextLogger.getTodayScheduleController} | Error: ${error.message}`
      );
      res.status(500).json(BaseResponse.internalServerErrorResponse());
      return;
    }
  }
}
