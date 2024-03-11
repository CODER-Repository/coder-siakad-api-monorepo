import { Response } from 'express';
import { BaseResponse } from './base-response';

// TODO FLOW
export const JsonResponse = (
  res: Response,
  status: any,
  resMessage: any,
  result: any
) => {
  res.status(status).json(BaseResponse.successResponse(result, resMessage));
};
