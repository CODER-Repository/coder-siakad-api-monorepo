import { Request, Response, NextFunction } from 'express';
import { Logger } from '@siakad/express.utils';
import jwt from 'jsonwebtoken';
import { BaseResponse } from '../response';
import { Console } from 'console';

interface TokenPayload {
    userId: string;
    email: string;
    username: string;
    role: string;
    roleId: string;
    nip?: string;
    nim?: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}

export const AuthContext = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json(BaseResponse.unauthorizedResponse('Unauthorized'));
        }

        const decoded = jwt.decode(token, { complete: true })
        req.user = decoded?.payload as TokenPayload
        console.log('decoded', decoded)

        next();
    } catch (error: any) {
        Logger.error(`[AuthContext] Error: ${error.message}`);
        return res.status(401).json(BaseResponse.unauthorizedResponse('Unauthorized'));
    }
};
