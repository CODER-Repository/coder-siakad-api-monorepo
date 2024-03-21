import { Student } from "@siakad/express.database";

export interface CreateStudentDto {
    id: string;
    nim: string;
    name: string;
    major: string;
    entryYear: Date;
    email: string;
    phone: string;
    birthday: Date;

  }
  
  export const toCreateStudentDto = (e: Student): CreateStudentDto => ({
    id: e?.user_id,
    nim: e?.nim,
    name: e?.full_name,
    email: e?.email,
    phone: e?.phone_number,
    major: e?.major_id,
    entryYear: e?.entry_year,
    birthday: e?.birth_date
  });
  