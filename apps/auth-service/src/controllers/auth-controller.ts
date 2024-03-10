import { Request, Response } from 'express';
import { EntityManager } from 'typeorm';
import bcrypt from 'bcrypt';

import { AppDataSource } from '@siakad/express.database';
import { BaseResponse } from '@siakad/express.server';
import { Logger, ROLE_ID } from '@siakad/express.utils';
import { LoginUserDTO, RegisterUserDTO } from '../interface/auth-interface';
import { AuthService } from '../service/auth-service';

export class AuthController {
  static async registerUser(
    req: Request<{}, {}, RegisterUserDTO>,
    res: Response
  ): Promise<void> {
    const context = '[AuthController.registerUser]';
    const { username, name, email, password, role_id } = req.body;
    try {
      const existingUserOrEmail = await AuthService.findExistingEmailOrUsername(
        username,
        email
      );

      if (existingUserOrEmail) {
        res.boom.badRequest('Username or email already exists');
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await AppDataSource.transaction(async (transaction: EntityManager) => {
        const user = await AuthService.createUser(
          transaction,
          req.body,
          hashedPassword
        );

        if (role_id === ROLE_ID.Student) {
          await AuthService.handleStudentRole(transaction, user, name);
        }

        if (role_id === ROLE_ID.Admin) {
          await AuthService.handleAdminRole(transaction, user, name);
        }

        await AuthService.createRoleUser(transaction, user, role_id);
      });

      Logger.info(`${context} | User registered successfully`);
      res
        .status(201)
        .json(BaseResponse.createdResponse('User registered successfully'));
    } catch (error) {
      Logger.error(
        `${context} | Error registering user: Message: ${error.message} | Stack: ${error.stack}`
      );
      res.boom.badImplementation();
    }
  }

  static async login(
    req: Request<{}, {}, LoginUserDTO>,
    res: Response
  ): Promise<void> {
    const context = '[AuthController.login]';
    const { username, password } = req.body;

    try {
      const user = await AuthService.findExistingUsername(username);
      if (!user) {
        Logger.error(`${context} | User not found for ${username}`);
        res.boom.notFound('Email or password is not valid'); // Menggunakan res.boom.notFound()
        return;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        Logger.error(`${context} | Invalid password for ${username}`);
        res.boom.unauthorized('Email or password is not valid'); // Menggunakan res.boom.unauthorized()
        return;
      }

      const token = await AuthService.generateJWTPayload(user);

      res.json(
        BaseResponse.successResponse({ token }, 'User logged in successfully')
      );
    } catch (error) {
      Logger.error(
        `${context} | Error logging in: Message: ${error.message} | Stack: ${error.stack}`
      );
      res.boom.badImplementation();
    }
  }
}
