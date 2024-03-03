import { Request, Response } from 'express';
import { EntityManager } from 'typeorm';

import { dbContext, AppDataSource } from '@siakad/express.database';
import { BaseResponse } from '@siakad/express.server';
import { Logger, ROLE_ID } from '@siakad/express.utils';
import { UserDTO, UserParamsDTO } from '../interface/user-interface';

// TODO: implement request validation
export class UserController {
  static async updateUser(
    req: Request<UserParamsDTO, {}, UserDTO>,
    res: Response
  ): Promise<void> {
    const context = '[UserController.updateUser]';
    const { user_id: userId } = req.params;
    const { username, email, role_id } = req.body;

    try {
      const existingUserOrEmail = await dbContext.User().findOne({
        where: [{ username }, { email }]
      });

      if (existingUserOrEmail) {
        res.boom.badRequest('Username or email already exists');
        return;
      }

      await AppDataSource.transaction(async (transaction: EntityManager) => {
        const user = dbContext
          .User()
          .update({ user_id: userId }, { username, email });
        await transaction.save(user);

        const roleUser = dbContext
          .RoleUser()
          .update({ user_id: userId }, { role_id: role_id || ROLE_ID.Student });

        await transaction.save(roleUser);
      });

      Logger.info(`${context} | User updated successfully`);
      res
        .status(200)
        .json(
          BaseResponse.successResponse({ userId }, 'User updated successfully')
        );
    } catch (error) {
      Logger.error(
        `${context} | Error registering user: Message: ${error.message} | Stack: ${error.stack}`
      );
      res.boom.badImplementation();
    }
  }
}
