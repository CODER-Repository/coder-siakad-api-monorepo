import { ROLE_ID, resMessage } from '@siakad/express.utils';
import { Request, Response, NextFunction } from 'express';

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const userAuth = req.user as unknown as string;
    const userProfile = JSON.parse(userAuth);
    req.user = userProfile; 
    
    if (userProfile.roleId === ROLE_ID.Admin) {
        next();
    } else {
        res.boom.forbidden(resMessage.validationRole);
    }
};

export default isAdmin;