import mongoose, { Schema, model, Model } from 'mongoose';
import { IOrder } from '../../interfaces';

const orderSchema: Schema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderNumber: { type: String, required: true },
    orderItems: [
      {
        _id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        title: { type: String, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
        slug: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        gender: { type: String, required: true },
      },
    ],
    shippingAddress: {
      name: { type: String, required: true },
      surnames: { type: String, required: true },
      address: { type: String, required: true },
      email: { type: String, required: true },
      telephone: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    numberOfItems: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

const Order: Model<IOrder> = mongoose.models.Order || model('Order', orderSchema);

export default Order;
