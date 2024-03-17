import { Request, Response } from 'express';
import { BaseResponse, JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger } from '@siakad/express.utils';
import { ClassService } from '../service/class-service';

export class ClassController {
  static async getClass(
    req: Request<{}, {}, {}, {}>,
    res: Response
  ): Promise<void> {
    try {
      const classResponse = await ClassService.getListClass();

      if (!classResponse) {
        Logger.error(
          `${contextLogger.getClassController} | Error: ${resMessage.emptyData}`
        );
        JsonResponse(res, 200, resMessage.emptyData, {
          class: []
        });
        return;
      }

      Logger.info(
        `${contextLogger.getClassController} | ${resMessage.success}`
      );
      JsonResponse(res, 200, resMessage.success, {
        class: classResponse
      });
    } catch (error) {
      Logger.error(
        `${contextLogger.getClassController} | Error: ${error.message}`
      );
      res.status(500).json(BaseResponse.internalServerErrorResponse());
      return;
    }
  }
}
