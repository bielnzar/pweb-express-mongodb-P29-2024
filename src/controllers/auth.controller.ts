import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const userData = await registerUser(username, email, password);
        res.json({
            status: "success",
            message: "User registered successfully",
            data: userData,
        });
    } catch (error) {
        if (error instanceof Error && error.message === 'User already registered') {
            res.status(400).json({
                status: "error",
                message: "User already registered",
            });
        } else {
            res.status(400).json({
                status: "failed",
                message: (error instanceof Error) ? error.message : 'An unknown error occurred',
            });
        }
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const identifier = username || email;
        const loginData = await loginUser(identifier, password);
        res.json({
            status: "success",
            message: "Login success",
            data: loginData,
        });
    } catch (error) {
        if (error instanceof Error && error.message === 'User not registered') {
            res.status(404).json({
                status: "error",
                message: "User not registered",
            });
        } else if (error instanceof Error && error.message === 'Invalid credentials') {
            res.status(401).json({
                status: "error",
                message: "Invalid credentials",
            });
        } else {
            res.status(400).json({
                status: "failed",
                message: (error instanceof Error) ? error.message : 'An unknown error occurred',
            });
        }
    }
};
