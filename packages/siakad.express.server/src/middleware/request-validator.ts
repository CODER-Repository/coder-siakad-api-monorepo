import { NextFunction, Request, Response } from 'express';
import { Logger } from '@siakad/express.utils';
import { validationResult } from 'express-validator';

export const ValidationHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        Logger.error(
            `[ValidationHandler] URL: ${req.method} ${req.url} | errors: ${JSON.stringify(errors.array())}`
        );

        const responseBuilder = {
            statusCode: 400,
            status: false,
            message: 'Invalid request parameters',
            error: 'Bad Request',
            ...errors.formatWith((error) => error.msg as string)
        };

        if (!errors.isEmpty()) {
            Logger.error(
                `[ValidationHandler] URL: ${req.method} ${req.originalUrl} | errors: ${JSON.stringify(errors.array())}`
            );
            return res.status(400).json(responseBuilder);
        }
    }
    next();
};
