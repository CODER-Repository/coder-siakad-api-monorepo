import { Request, Response } from 'express';
import { EntityManager } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
    dbContext,
    AppDataSource,
    User,
    RoleUser
} from '@siakad/express.database';
import { BaseResponse } from '@siakad/express.server';
import { Logger, ROLE_ID } from '@siakad/express.utils';
import { LoginUserDTO, RegisterUserDTO } from '../interface/auth-interface';

export class AuthController {
    static async registerUser(
        req: Request<{}, {}, RegisterUserDTO>,
        res: Response
    ): Promise<void> {
        const context = '[AuthController.registerUser]';
        const { username, email, password, role_id } = req.body;
        try {
            const existingUserOrEmail = await dbContext.User().findOne({
                where: [{ username }, { email }]
            });

            if (existingUserOrEmail) {
                res.boom.badRequest('Username or email already exists');
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await AppDataSource.transaction(
                async (transaction: EntityManager) => {
                    const user = new User();
                    user.username = username;
                    user.email = email;
                    user.password = hashedPassword;
                    await transaction.save(user);
                    console.log(user, 'HERE');
                    const roleUser = new RoleUser();
                    roleUser.user_id = user.user_id;
                    roleUser.role_id = role_id || ROLE_ID.Student;

                    await transaction.save(roleUser);
                }
            );

            Logger.info(`${context} | User registered successfully`);
            res.status(201).json(
                BaseResponse.createdResponse('User registered successfully')
            );
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
            const user = await User.findOne({ where: { username } });
            if (!user) {
                Logger.error(`${context} | User not found for ${username}`);
                res.boom.notFound('Email or password is not valid'); // Menggunakan res.boom.notFound()
                return;
            }

            const passwordMatch = await bcrypt.compare(
                password,
                user.password || ''
            );
            if (!passwordMatch) {
                Logger.error(`${context} | Invalid password for ${username}`);
                res.boom.unauthorized('Email or password is not valid'); // Menggunakan res.boom.unauthorized()
                return;
            }

            const jwtPayload = await dbContext.UserRoleView().findOne({
                where: { user_id: user.user_id }
            });

            const token = jwt.sign(
                {
                    userId: jwtPayload.user_id,
                    email: jwtPayload.email,
                    username: jwtPayload.username,
                    role: jwtPayload.role_name,
                    roleId: jwtPayload.role_id
                },
                process.env.JWT_SECRET || 'your_secret_key',
                {
                    expiresIn: '1h'
                }
            );

            res.json(
                BaseResponse.successResponse(
                    { token },
                    'User logged in successfully'
                )
            );
        } catch (error) {
            Logger.error(
                `${context} | Error logging in: Message: ${error.message} | Stack: ${error.stack}`
            );
            res.boom.badImplementation();
        }
    }
}
