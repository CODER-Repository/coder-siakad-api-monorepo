import Joi from 'joi';
import { ROLE_ID } from '@siakad/express.utils';

export const updateUserBodySchema = Joi.object({
  username: Joi.string().alphanum().min(6).max(15).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false }
    })
    .required(),
  role_id: Joi.string()
    .valid(...Object.values(ROLE_ID))
    .required()
});
