import { Result } from 'express-validator';

export const BaseResponse = {
    successResponse: (
        data: string | object | Array<object>,
        message: string
    ) => {
        return {
            statusCode: 200,
            status: true,
            data,
            message
        };
    },

    createdResponse: (message: string) => {
        return {
            statusCode: 201,
            status: true,
            message
        };
    },

    errorResponse: (
        statusCode: number,
        message: string,
        errors: Result<string>
    ) => {
        return {
            statusCode,
            status: false,
            error: message,
            errors: errors || null
        };
    },

    internalServerErrorResponse: () => {
        return {
            statusCode: 500,
            status: false,
            error: 'Internal server error'
        };
    },

    unauthorizedResponse: (message: string) => {
        return {
            statusCode: 401,
            status: false,
            error: message
        };
    }
};
