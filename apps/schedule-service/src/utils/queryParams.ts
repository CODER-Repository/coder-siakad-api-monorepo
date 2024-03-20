import { Like, In } from 'typeorm';
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
    size: number;
    limit: number;
    offset: number;
}

export const ToSeqWhere = (q: QueryParamsDto) => {
    let filterQuery = {};

    if (q['class_id']) {
        filterQuery['class_id'] = q['class_id'];
    }

    if (q['classroom']) {
        filterQuery['classroom_id'] = q['classroom'];
    }

    // query using sparator ,
    // TODO ADD Other query based on flow
    if (q['nip']) {
        const lecturerIds = q['nip'].split(',').map(a => a.trim());
        if (lecturerIds.length === 1) {
            filterQuery['lecturer_id'] = Like(`%${lecturerIds[0]}%`);
        } else if (lecturerIds.length > 1) {
            filterQuery['lecturer_id'] = In(lecturerIds);
        }
    }
    

    return filterQuery;
};
