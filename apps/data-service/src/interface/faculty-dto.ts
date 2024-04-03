import {Faculty } from '@siakad/express.database';

export interface CreateFacultyDto {
    id: number;
    name: string;
}

export const toCreateFacultyDTO = (e: Faculty): CreateFacultyDto => ({
    id: e?.faculty_id,
    name: e?.faculty_name,
});
  