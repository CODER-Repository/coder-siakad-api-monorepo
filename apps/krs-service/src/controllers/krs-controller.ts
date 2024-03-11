import { Request, Response } from 'express';
import { EntityManager } from 'typeorm';
import bcrypt from 'bcrypt';

import { AppDataSource } from '@siakad/express.database';
import { BaseResponse } from '@siakad/express.server';
import { Logger, ROLE_ID } from '@siakad/express.utils';
import { KRSService } from '../service/krs-service';

export class KRSController {
    static async showKRS(req: Request, res: Response) {
        const context = '[KRSController.showKRS]';
        try {
            const krs = await KRSService.showKRS();
            console.log(krs);
            return res.json(
                BaseResponse.successResponse(krs, 'KRS retrieved successfully')
            );
        } catch (error) {
            Logger.error(`${context} | Error: ${error.message}`);
            res.boom.badRequest(error.message);
        }
    }
}
