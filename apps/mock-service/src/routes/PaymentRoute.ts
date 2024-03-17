import express, { Request, Response } from 'express';
import PaymentHistory from '../resource/payment/PaymentHistory.json';
import UnpaidBills from '../resource/payment/UnpaidBills.json';
import UploadPayment from '../resource/payment/UploadPayment.json';
import { Logger } from '@siakad/express.utils';

const router = express.Router();

const Namespace = 'PaymentController';

interface HistoryQuery {
    page: number;
    page_size: number;
    unpaid: boolean;
}

router.get(
    '/history',
    (req: Request<{}, {}, {}, HistoryQuery>, res: Response): Response => {
        if (req.query.unpaid) {
            Logger.info(`[${Namespace}]`, 'Success get unpaid payment history');
            return res.json(UnpaidBills);
        }
        Logger.info(`[${Namespace}]`, 'Success get payment history');
        return res.json(PaymentHistory);
    }
);

router.post('/pay', (req: Request, res: Response): Response => {
    Logger.info(`[${Namespace}]`, 'Payment request has been submitted');
    return res.json(UploadPayment);
});

export default router;
