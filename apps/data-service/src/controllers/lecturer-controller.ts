import { Request, Response } from 'express';
import { BaseResponse, JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger } from '@siakad/express.utils';
import { LecturerService } from '../service/lecturer-service';
import { PaginateOption, QueryParamsDto } from '../utils/queryParams';
import { ToSeqWhere } from '../params/lecturer-params';

export class LecturerController {
  private readonly paginate: PaginateOption;

  constructor(paginate: PaginateOption) {
    this.paginate = paginate;
  }
  static async getLecturer(
    req: Request<{}, {}, {}, QueryParamsDto>,
    res: Response
  ): Promise<void> {
    try {
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

      const lectures = await LecturerService.getListLecturer(query);

      if (!lectures) {
        Logger.error(
          `${contextLogger.getLecturerController} | Error: ${resMessage.emptyData}`
        );
        JsonResponse(res, resMessage.emptyData, 'success', {
          data: []
        });
        return;
      }

      Logger.info(
        `${contextLogger.getLecturerController} | ${resMessage.success}`
      );
      JsonResponse(res, resMessage.success, 'success', {
        data: lectures,
        pagination
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
