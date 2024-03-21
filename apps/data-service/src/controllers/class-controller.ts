import { Request, Response } from 'express';
import { BaseResponse, JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger } from '@siakad/express.utils';
import { ClassService } from '../service/class-service';
import { PaginateOption, QueryParamsDto } from '../utils/queryParams';
import { ToSeqWhere } from '../params/class-params';

export class ClassController {
  private readonly paginate: PaginateOption;

  constructor(paginate: PaginateOption) {
    this.paginate = paginate;
  }
  static async getClass(
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
      const classResponse = await ClassService.getListClass(query);

      if (!classResponse) {
        Logger.error(
          `${contextLogger.getClassController} | Error: ${resMessage.emptyData}`
        );
        JsonResponse(res, resMessage.emptyData, 'success', {
          class: []
        });
        return;
      }

      Logger.info(
        `${contextLogger.getClassController} | ${resMessage.success}`
      );
      JsonResponse(res, resMessage.success, 'success', {
        data: classResponse, pagination
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
