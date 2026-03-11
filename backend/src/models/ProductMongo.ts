import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description?: string;
    price: number;
    currency: string;
    category: string;
    image: string;
    rating: number;
    stock: number;
    vendorId: mongoose.Types.ObjectId;
    createdAt: Date;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    currency: { type: String, default: '£' },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    vendorId: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
