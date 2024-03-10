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
