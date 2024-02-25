import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

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
            const response: ApiResponse<null> = {
                statusCode: 500,
                status: false,
                error: "Internal Server Error",
            };
            res.status(500).json(response);
        }
    }

    static async registerUser(req: Request, res: Response): Promise<void> {
        const { username, email, password } = req.body;

        try {
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                const response: ApiResponse<null> = {
                    statusCode: 400,
                    status: false,
                    error: "Username already exists",
                };
                res.status(400).json(response);
                return;
            }

            const existingEmail = await User.findOne({ where: { email } });
            if (existingEmail) {
                const response: ApiResponse<null> = {
                    statusCode: 400,
                    status: false,
                    error: "Email already exists",
                };
                res.status(400).json(response);
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await User.create({
                username,
                email,
                password: hashedPassword
            });

            const response: ApiResponse<null> = {
                statusCode: 201,
                status: true,
                message: "User registered successfully",
            };
            res.status(201).json(response);
        } catch (error) {
            console.error("Error registering user:", error);
            const response: ApiResponse<null> = {
                statusCode: 500,
                status: false,
                error: "Internal Server Error",
            };
            res.status(500).json(response);
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ where: { username } });
            if (!user) {
                const response: ApiResponse<null> = {
                    statusCode: 404,
                    status: false,
                    error: "User not found",
                };
                res.status(404).json(response);
                return;
            }

            const passwordMatch = await bcrypt.compare(password, user.password || '');
            if (!passwordMatch) {
                const response: ApiResponse<null> = {
                    statusCode: 401,
                    status: false,
                    error: "Invalid password",
                };
                res.status(401).json(response);
                return;
            }

            const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });

            const response: ApiResponse<{ token: string }> = {
                statusCode: 200,
                status: true,
                data: { token },
                message: "User logged in successfully",
            };
            res.json(response);
        } catch (error) {
            console.error("Error logging in:", error);
            const response: ApiResponse<null> = {
                statusCode: 500,
                status: false,
                error: "Internal Server Error",
            };
            res.status(500).json(response);
        }
    }
}
