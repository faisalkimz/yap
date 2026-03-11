import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
    productId: mongoose.Types.ObjectId;
    name: string;
    quantity: number;
    price: number;
    image: string;
}

export interface IOrder extends Document {
    userId: mongoose.Types.ObjectId;
    items: IOrderItem[];
    totalAmount: number;
    shippingAddress: string;
    paymentMethod: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    orderDate: Date;
}

const OrderSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    },
    orderDate: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>('Order', OrderSchema);
