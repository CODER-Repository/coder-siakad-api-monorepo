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

    errorResponse: (statusCode: number, message: string) => {
        return {
            statusCode,
            status: false,
            error: message
        };
    }
};
