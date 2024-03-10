import { Request, Response } from 'express';
import { BaseResponse } from '@siakad/express.server';
import { Logger } from '@siakad/express.utils';
import { ScheduleService } from '../service/schedule-service';

export class ScheduleController {
  static async getSchedule(
    req: Request<{}, {}, {}, {}>,
    res: Response
  ): Promise<void> {
    const context = '[ScheduleController.getSchedule]';

    try {
      const schedules = await ScheduleService.getAllSchedules();
      if (!schedules || schedules.length === 0) {
        Logger.error(`${context} | No schedules found`);
        res
          .status(200)
          .json(BaseResponse.successResponse({}, 'Data not found'));
        return;
      }

      res
        .status(200)
        .json(
          BaseResponse.successResponse(
            schedules,
            'Successfully retrieved schedules'
          )
        );
    } catch (error) {
      Logger.error(`${context} | Error: ${error.message}`);
      res.boom.badImplementation('Internal Server Error');
      return;
    }
  }
}
