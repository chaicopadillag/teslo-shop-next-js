import { IUser, ShippingAddressType, ISize } from './';
export type IOrder = {
  _id?: string;
  orderNumber?: string;
  user?: string | IUser;
  shippingAddress: ShippingAddressType;
  orderItems: IOrderItem[];
  paymentResult?: string;
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  isPaid: boolean;
  paidAt?: Date;
  transactionId?: string;
};

export type IOrderItem = {
  _id: string;
  title: string;
  size: ISize;
  quantity: number;
  slug: string;
  price: number;
  image: string;
  gender: string;
};
