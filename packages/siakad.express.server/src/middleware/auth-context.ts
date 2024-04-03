import { Request, Response, NextFunction } from 'express';
import { Logger } from '@siakad/express.utils';
import { BaseResponse } from '../response';

interface UserPayload {
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
            user?: UserPayload;
        }
    }
}

export const AuthContext = (req: Request, res: Response, next: NextFunction) => {
    try {
        const profile = req.header('X-User-Profile');
        if (!profile) {
            return res.status(401).json(BaseResponse.unauthorizedResponse('Unauthorized'));
        }
        req.user = profile as unknown as UserPayload;
        next();
    } catch (error: any) {
        Logger.error(`[AuthContext] Error: ${error.message}`);
        return res.status(401).json(BaseResponse.unauthorizedResponse('Unauthorized'));
    }
};
