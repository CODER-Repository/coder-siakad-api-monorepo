import { Request, Response } from 'express';
import { BaseResponse, JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger } from '@siakad/express.utils';
import { LecturerService } from '../service/lecturer-service';

export class LecturerController {
  static async getLecturer(
    req: Request<{}, {}, {}, {}>,
    res: Response
  ): Promise<void> {
    try {
      const lectures = await LecturerService.getListLecturer();

      if (!lectures) {
        Logger.error(
          `${contextLogger.getLecturerController} | Error: ${resMessage.emptyData}`
        );
        JsonResponse(res, 200, resMessage.emptyData, {
          data: []
        });
        return;
      }

      Logger.info(
        `${contextLogger.getLecturerController} | ${resMessage.success}`
      );
      JsonResponse(res, 200, resMessage.success, {
        data: lectures
      });
    } catch (error) {
      Logger.error(
        `${contextLogger.getLecturerController} | Error: ${error.message}`
      );
      res.status(500).json(BaseResponse.internalServerErrorResponse());
      return;
    }
  }
}
