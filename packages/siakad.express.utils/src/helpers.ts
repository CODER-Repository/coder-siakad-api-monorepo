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

interface QueryValue {
    [key: string]: any;
}

export const buildWhereCondition = (where: QueryValue) => {
    const conditions = [];
    const parameters: QueryValue = {}; 

    for (const key in where) {
        if (Object.prototype.hasOwnProperty.call(where, key)) {
            const [entity, field] = key.split('.');
            const values = where[key].split(',').map((value: string) => value.trim());
            
            if (values.length > 1) {
                const orConditions = values.map((value: string, index: number) => {
                    const paramName = `${key}_${index}`;
                    parameters[paramName] = value;
                    return `${entity}.${field} = :${paramName}`;
                });
                conditions.push(`(${orConditions.join(' OR ')})`);
            } else {
                conditions.push(`${entity}.${field} = :${key}`);
                parameters[key] = values[0];
            }
        }
    }

    return { condition: conditions.join(' AND '), parameters };
};

export const PaginateOptions = {
    MaxSize: 25
};

export const paginationHelper = (page: number , size: number) => {
    page = Math.max(0, page || 1);
    size = Math.min(PaginateOptions.MaxSize, Math.max(0, size || PaginateOptions.MaxSize));

    return { page, size };
};

export const queryHelper = (where: object, offset: number, limit: number) => {
    const { page, size } = paginationHelper(offset, limit);
    const query = {
        where,
        limit: size,
        offset: (page - 1) * size  
    };
    return query;
};
