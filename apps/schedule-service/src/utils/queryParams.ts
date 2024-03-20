import { Op } from 'sequelize';

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

    //filter using sparator ,
    if (q['lecturer_id']) {
        const lecturers = q['lecturer_id'].split(',').map(a => a.trim());
        filterQuery['lecturer_id'] = lecturers
    }

    return filterQuery;
};

export const buildWhereCondition = (where, columnName) => {
    const whereCondition = {};
    let columnKey;
  
    if (where) {
      for (const key in where) {
        if (Array.isArray(where[key])) {
          whereCondition[key] = where[key].join(',');
          if (key === columnName) {
            columnKey = where[key];
          }
        } else {
          whereCondition[key] = where[key];
        }
      }
    }
  
    return { whereCondition, columnKey };
  }