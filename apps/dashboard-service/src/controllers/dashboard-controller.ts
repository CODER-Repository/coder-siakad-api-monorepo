import { Request, Response } from 'express';

import { BaseResponse } from '@siakad/express.server';
import { Logger } from '@siakad/express.utils';
import { DasboardService } from '../service/dashboard-service';

export class DashboardController {
    static async showDashboard(req: Request, res: Response) {
        const context = '[DashboardController.showDashboard]';
        try {
            const studentId = req.user.nim;
            const dashboardData = await DasboardService.showDashboard(studentId);
            return res.json(
                BaseResponse.successResponse(dashboardData, 'Dashboard retrieved successfully')
            );
        } catch (error) {
            Logger.error(`${context} | Error: ${error.message}`);
            return res.boom.badImplementation();
        }
    }
}
