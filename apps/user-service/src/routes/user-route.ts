import { Router } from 'express';
import { createValidator } from 'express-joi-validation';
import { UserController } from '../controllers/user-controller';
import { updateUserBodySchema } from '../schema/update-user';

const validator = createValidator();

const userRouter = Router();

userRouter
  .route('/:user_id')
  .patch(validator.body(updateUserBodySchema), UserController.updateUser);

export default userRouter;
