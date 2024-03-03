import { Router } from 'express';
import { UserController } from '../controllers/user-controller';

const userRouter = Router();

userRouter.route('/:user_id').put(UserController.updateUser);

export default userRouter;
