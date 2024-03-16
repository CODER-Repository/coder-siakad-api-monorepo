import { dbContext, User } from '@siakad/express.database';
import { EntityManager } from 'typeorm';
import { JwtPayloadInterface, RegisterUserDTO } from '../interface/auth-interface';
import {
    Logger,
    ROLE_ID,
    generateUniqueRandomString
} from '@siakad/express.utils';
import jwt from 'jsonwebtoken';

export class AuthService {
    static async createUser(
        transaction: EntityManager,
        payload: RegisterUserDTO,
        hashedPassword: string
    ): Promise<User> {
        try {
            const user = dbContext.User().create();
            user.username = payload.username;
            user.email = payload.email;
            user.password = hashedPassword;
            return transaction.save(user);
        } catch (error) {
            Logger.error(`[AuthService.createUser] Error: ${error.message}`);
            throw error;
        }
    }

    static async handleStudentRole(
        transaction: EntityManager,
        user: User,
        name: string
    ) {
        try {
            const student = dbContext.Student().create();
            student.email = user.email;
            student.full_name = name;

            // Generate unique random string for nim with length of 30
            // It will be replaced after user finished creating their profile
            student.nim = generateUniqueRandomString(30);
            student.user_id = user.user_id;

            await transaction.save(student);
        } catch (error) {
            Logger.error(`[AuthService.handleStudentRole] Error: ${error.message}`);
            throw error;
        }
    }

    static async handleAdminRole(
        transaction: EntityManager,
        user: User,
        name: string
    ) {
        try {
            const admin = dbContext.Administrator().create();
            admin.user_id = user.user_id;
            // Generate unique random string for nip with length of 30
            // It will be replaced after admin finished creating their profile
            admin.nip = generateUniqueRandomString(30);
            admin.full_name = name;
            await transaction.save(admin);
        } catch (error) {
            Logger.error(`[AuthService.handleAdminRole] Error: ${error.message}`);
            throw error;
        }
    }

    static async createRoleUser(
        transaction: EntityManager,
        user: User,
        role_id: string
    ) {
        try {
            const roleUser = dbContext.RoleUser().create();
            roleUser.user_id = user.user_id;
            roleUser.role_id = role_id || ROLE_ID.Student;
            await transaction.save(roleUser);
        } catch (error) {
            Logger.error(`[AuthService.createRoleUser] Error: ${error.message}`);
            throw error;
        }
    }

    static async findExistingEmailOrUsername(username: string, email: string): Promise<User> {
        try {
            return dbContext.User().findOne({
                where: [{ username }, { email }]
            });
        } catch (error) {
            Logger.error(
                `[AuthService.findExistingEmailOrUsername] Error: ${error.message}`
            );
            throw error;
        }
    }

    static async findExistingUsername(username: string): Promise<User> {
        try {
            return dbContext.User().findOne({
                where: { username }
            });
        } catch (error) {
            Logger.error(
                `[AuthService.findExistingUsername] Error: ${error.message}`
            );
            throw error;
        }
    }

    static async generateJWTPayload(user: User): Promise<string> {
        try {
            const { JWT_SECRET } = process.env;
            const userPayload = await dbContext.UserRoleView().findOne({
                where: { user_id: user.user_id }
            });

            let jwtPayload : JwtPayloadInterface = {
                userId: userPayload.user_id,
                email: userPayload.email,
                username: userPayload.username,
                role: userPayload.role_name,
                roleId: userPayload.role_id
            };

            if (userPayload.role_id === ROLE_ID.Student) {
                const student = await dbContext.Student().findOne({
                    where: { user_id: user.user_id }
                });
                jwtPayload = { ...jwtPayload, nim: student.nim };
            }

            if (userPayload.role_id === ROLE_ID.Admin) {
                const admin = await dbContext.Administrator().findOne({
                    where: { user_id: user.user_id }
                });
                jwtPayload = { ...jwtPayload, nip: admin.nip };
            }

            return jwt.sign(jwtPayload, JWT_SECRET, {
                expiresIn: '1h'
            });
        } catch (error) {
            Logger.error(`[AuthService.generateJWTPayload] Error: ${error.message}`);
            throw error;
        }
    }
}
