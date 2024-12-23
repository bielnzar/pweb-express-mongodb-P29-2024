import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    tokens: { token: string }[];
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tokens: [{ token: { type: String, required: true } }]
});

export const User = mongoose.model<IUser>('User', userSchema);
export default User;
