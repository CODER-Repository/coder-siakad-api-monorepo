import { Router } from 'express';
import { UserController } from '../controllers/user-controller';

const userRouter = Router();

userRouter.route('/:user_id').patch(UserController.updateUser);

export default userRouter;
