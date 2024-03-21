import { Request, Response } from 'express';
import { EntityManager } from 'typeorm';

import {
  dbContext,
  AppDataSource,
  User,
  Role,
  RoleUser
} from '@siakad/express.database';
import { JsonResponse } from '@siakad/express.server';
import { Logger, ROLE_ID, contextLogger } from '@siakad/express.utils';
import { UserDTO, UserParamsDTO } from '../interface/user-interface';

export class UserController {
  static async updateUser(
    req: Request<UserParamsDTO, {}, UserDTO>,
    res: Response
  ): Promise<void> {
    const { user_id: userId } = req.params;
    const { username, email, role_id } = req.body;

    try {
      const existingUser = await dbContext
        .User()
        .findOne({ where: { user_id: userId } });
      if (!existingUser) {
        res.boom.notFound('User not found');
      }

      await AppDataSource.transaction(async (transaction) => {
        const userUpdate = await transaction.update(
          User,
          { user_id: userId },
          { username, email }
        );
        const userRole = await transaction.update(
          RoleUser,
          { user_id: userId },
          { role_id: role_id || ROLE_ID.Student }
        );
        Promise.all([
          transaction.save(userUpdate.raw),
          transaction.save(userRole.raw)
        ]);

        Logger.info(`${contextLogger.updateUser} | User updated successfully`);
        return JsonResponse(res, 'User updated successfully', 'success', { userId });
      });
    } catch (error) {
      Logger.error(
        `${contextLogger.updateUser} | Error updating user: Message: ${error.message} | Stack: ${error.stack}`
      );
      res.boom.badImplementation();
    }
  }
}
