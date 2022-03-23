import { IUser, ShippingAddressType } from './';
export type IOrder = {
  _id?: string;
  orderNumber: string;
  user: string | IUser;
  shippingAddress: ShippingAddressType;
  orderItems: IOrderItem[];
  paymentResult?: string;
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  isPaid: boolean;
  paidAt?: string;
};

export type IOrderItem = {
  _id: string;
  product: string;
  size: string;
  quantity: number;
  slug: string;
  price: number;
  image: string;
};
