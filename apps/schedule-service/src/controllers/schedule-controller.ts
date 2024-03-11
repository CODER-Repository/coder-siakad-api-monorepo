import { Request, Response } from 'express';
import { BaseResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger } from '@siakad/express.utils';
import { ScheduleService } from '../service/schedule-service';

export class ScheduleController {
  static async getSchedule(
    req: Request<{}, {}, {}, {}>,
    res: Response
  ): Promise<void> {
    try {
      const schedules = await ScheduleService.getAllSchedules();
      if (!schedules || schedules.length === 0) {
        Logger.error(`${contextLogger.getSchedule} | ${resMessage.notFound}`);
        res
          .status(200)
          .json(BaseResponse.successResponse({}, resMessage.notFound));
        return;
      }

      res
        .status(200)
        .json(BaseResponse.successResponse(schedules, resMessage.success));
    } catch (error) {
      Logger.error(`${contextLogger.getSchedule} | Error: ${error.message}`);
      res.boom.badImplementation(resMessage.badImplementation);
      return;
    }
  }
}
