import jwt from 'jsonwebtoken';

export function generateUniqueRandomString(length: number): string {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

interface TokenPayload {
    userId: string;
    email: string;
    username: string;
    role: string;
    roleId: string;
    nim?: string;
    nip?: string;
}


export const getUserFromToken = (token: string) : TokenPayload | Error => {
    const { JWT_SECRET } = process.env;

    if (!token) {
        throw new Error('Token not found');
    }

    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET not found');
    }

    try {
        const userToken = token.split(' ')[1] as string;
        const authUser = jwt.verify(userToken, JWT_SECRET);

        if (!authUser) {
            return new Error('Error when parsing token');
        }

        return authUser as TokenPayload;
    } catch (error) {
        throw new Error('Error when verifying token: ' + error);
    }
};

