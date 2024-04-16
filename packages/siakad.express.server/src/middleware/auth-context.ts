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

export const AuthContext = (req: Request<{}, {}, {}, {}, Record<string, {}>>, res: Response<{}, Record<string, {}>>, next: NextFunction): Response<{}, Record<string, {}>> | void => {
    try {
        const profileString: string| null = req.header('X-User-Profile') || null;
        if (!profileString) {
            return res.status(401).json(BaseResponse.unauthorizedResponse('Unauthorized'));
        }
        const profile: UserPayload = JSON.parse(profileString);
        req.user = profile;
        next();
    } catch (error: any) {
        Logger.error(`[AuthContext] Error: ${error.message}`);
        return res.status(401).json(BaseResponse.unauthorizedResponse('Unauthorized'));
    }
};