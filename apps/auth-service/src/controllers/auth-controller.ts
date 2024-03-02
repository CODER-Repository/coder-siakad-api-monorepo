import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { HttpLogger, Logger } from '@siakad/express.utils';

interface ApiResponse<T> {
    statusCode: number;
    status: boolean;
    data?: T;
    message?: string;
    error?: string | string[];
}

export class AuthController {
    static async getUser(req: Request, res: Response): Promise<void> {
        try {
            const users = await User.findAll();
            const userEmails = users.map(user => user.email);
            const response: ApiResponse<string[]> = {
                statusCode: 200,
                status: true,
                data: userEmails,
                message: "Users fetched successfully",
            };
            res.json(response); 
        } catch (error) {
            console.error("Error fetching users:", error);
            res.boom.badImplementation();
        }
    }

    static async registerUser(req: Request, res: Response): Promise<void> {
        const { username, email, password } = req.body;

        try {
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                res.boom.badRequest("Username already exists"); // Menggunakan res.boom.badRequest()
                return;
            }

            const existingEmail = await User.findOne({ where: { email } });
            if (existingEmail) {
                res.boom.badRequest("Email already exists"); // Menggunakan res.boom.badRequest()
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await User.create({
                username,
                email,
                password: hashedPassword
            });
            const response: ApiResponse<string> = {
                statusCode: 201,
                status: true,
                data: "User registered successfully",
                message: "User registered successfully",
            };
            res.status(201).json(response);
        } catch (error) {
            console.error("Error registering user:", error);
            res.boom.badImplementation();
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ where: { username } });
            if (!user) {
                res.boom.notFound("User not found"); // Menggunakan res.boom.notFound()
                return;
            }

            const passwordMatch = await bcrypt.compare(password, user.password || '');
            if (!passwordMatch) {
                res.boom.unauthorized("Invalid password"); // Menggunakan res.boom.unauthorized()
                return;
            }

            const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
            const response: ApiResponse<{ token: string }> = {
                statusCode: 200,
                status: true,
                data: { token },
                message: "User logged in successfully",
            };
            res.status(200).json(response);
        } catch (error) {
            console.error("Error logging in:", error);
            res.boom.badImplementation();
        }
    }
}
