import { NextFunction, Request, Response } from 'express';
import { Logger } from '@siakad/express.utils';
import { validationResult } from 'express-validator';

export const ValidationHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    const formattedErrors = errors.formatWith((error) => error.msg as string);

    if (!errors.isEmpty()) {
        Logger.error(
            `[ValidationHandler] URL: ${req.method} ${req.url} | errors: ${JSON.stringify(errors.array())}`
        );
        return res.boom.badRequest(formattedErrors as unknown as string);
    }
    next();
};
