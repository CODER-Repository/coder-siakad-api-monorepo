import { Request, Response } from 'express';

import { BaseResponse } from '@siakad/express.server';
import { Logger } from '@siakad/express.utils';
import { KRSService } from '../service/krs-service';

export class KRSController {
    static async showKRS(req: Request, res: Response) {
        const context = '[KRSController.showKRS]';
        try {
            const krs = await KRSService.showKRS();
            return res.json(
                BaseResponse.successResponse(krs, 'KRS retrieved successfully')
            );
        } catch (error) {
            Logger.error(`${context} | Error: ${error.message}`);
            return res.boom.badImplementation();
        }
    }
}
