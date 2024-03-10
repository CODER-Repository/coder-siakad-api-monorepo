import { checkSchema } from 'express-validator';
import { ROLE_ID_ENUM } from '@siakad/express.utils';

export const LoginSchema = checkSchema({
  username: {
    in: ['body'],
    isString: true,
    isEmpty: false
  },
  password: {
    in: ['body'],
    isString: true,
    isEmpty: false
  }
});

export const RegisterSchema = checkSchema({
  username: {
    in: ['body'],
    isString: true,
    isEmpty: false
  },
  email: {
    in: ['body'],
    isEmail: true,
    isEmpty: false
  },
  name: {
    in: ['body'],
    isString: true,
    isEmpty: false
  },
  password: {
    in: ['body'],
    isString: true,
    isEmpty: false
  },
  role_id: {
    in: ['body'],
    isString: true,
    isEmpty: false,
    custom: {
      options: (value: ROLE_ID_ENUM) => {
        if (!Object.values(ROLE_ID_ENUM).includes(value)) {
          throw new Error('Invalid role_id');
        }
        return true;
      }
    }
  }
});
