import { Response } from 'express';
import { BaseResponse } from './base-response';

export const JsonResponse = (
  res: Response,
  resMessage: string,
  type: string,
  result: any = null,
) => {
  let response;
  let status = 200;

  switch (type) {
    case 'created':
      response = BaseResponse.createdResponse(resMessage);
      status = 201
      break;
    case 'success':
      response = BaseResponse.successResponse(result, resMessage);
      status = 200
      break;
    case 'unauthorized':
      response = BaseResponse.unauthorizedResponse(resMessage);
      status = 403 
      break;
    case 'internalServerError':
      response = BaseResponse.internalServerErrorResponse();
      status = 500
      break;
    default:
      response = BaseResponse.successResponse(result, resMessage);
  }

  res.status(status).json(response);
};
