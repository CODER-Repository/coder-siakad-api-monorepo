import { Request, Response } from 'express';
import { BaseResponse, JsonResponse } from '@siakad/express.server';
import { Logger, resMessage, contextLogger } from '@siakad/express.utils';
import { PaginateOption, QueryParamsDto } from '../utils/queryParams';
import { ToSeqWhere } from '../params/classroom-params';
import { ClassroomService } from '../service/classroom-service';

export class ClassroomController {
  static async getClassroom(
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
      const classroomResponse = await ClassroomService.getListClassroom(query);

      if (!classroomResponse) {
        Logger.error(
          `['ClassroomService.getListStudent'] | Error: ${resMessage.emptyData}`
        );
        JsonResponse(res, resMessage.emptyData, 'success', {
          class: []
        });
        return;
      }

      Logger.info(
        `['ClassroomService.getListStudent'] | ${resMessage.success}`
      );
      JsonResponse(res, resMessage.success, 'success', {
        data: classroomResponse, pagination
      });
    } catch (error) {
      Logger.error(
        `['ClassroomService.getListStudent'] | Error: ${error.message}`
      );
      res.status(500).json(BaseResponse.internalServerErrorResponse());
      return;
    }
  }
}
