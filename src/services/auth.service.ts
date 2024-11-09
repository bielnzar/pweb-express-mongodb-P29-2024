import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerUser = async (username: string, email: string, password: string) => {

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        throw new Error('User already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    return { id: user._id, username: user.username, email: user.email };
};

export const loginUser = async (identifier: string, password: string) => {

    const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });
    if (!user) {
        throw new Error('User not registered');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    return {
        user: {
            username: user.username,
            email: user.email,
        },
        token,
    };
};
