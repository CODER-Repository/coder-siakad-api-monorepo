import { ROLE_ID_ENUM } from '@siakad/express.utils';

export interface RegisterUserDTO {
    username: string;
    name: string;
    email: string;
    password: string;
    role_id: ROLE_ID_ENUM;
}

export interface LoginUserDTO {
    username: string;
    password: string;
}

export interface JwtPayloadInterface {
    userId: string;
    email: string;
    username: string;
    role: string;
    roleId: string;
    nim?: string;
    nip?: string;
}