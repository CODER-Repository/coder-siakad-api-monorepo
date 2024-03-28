export class PaginateOption {
    public MaxSize: number;

    constructor() {
        this.MaxSize = 25
            ? Number(25)
            : 25;
    }
}

export class QueryParamsDto {
    page: number;
    page_size: number;
    limit: number;
    offset: number;
    where?: string;
};

export interface DTO {
    data: object
    pagination: object
}

export interface CreateDTO {
    data: object  
}