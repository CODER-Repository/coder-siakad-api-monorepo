import { Request, Response, NextFunction } from 'express';
import { Logger } from '@siakad/express.utils';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

interface TokenPayload {
    userId: string;
    email: string;
    username: string;
    role: string;
    roleId: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}

export const VerifyAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { JWT_SECRET } = process.env;
        if (!JWT_SECRET) {
            res.boom.badImplementation('JWT_SECRET not found');
            return;
        }

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.boom.unauthorized('Token not found');
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded as TokenPayload;

        next();
    } catch (error: any) {
        Logger.error(`[VerifyAuth] Error: ${error.message}`);
    }
};
