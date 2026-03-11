import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'customer' | 'vendor' | 'admin';
    avatar?: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'vendor', 'admin'], default: 'customer' },
    avatar: { type: String },
});

export default mongoose.model<IUser>('User', UserSchema);
