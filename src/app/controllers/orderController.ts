import { isValidObjectId } from 'mongoose';
import { db } from '../database';
import { Order } from '../models';
import { IOrder } from '../../interfaces';
/**
 *
 * @param orderId
 * @param userId
 */
export const getOrderByIdAndUser = async (orderId: string, userId: string): Promise<IOrder | null> => {
  if (!isValidObjectId(orderId) || !isValidObjectId(userId)) return null;
  try {
    db.connect();
    const order = await Order.findOne({ _id: orderId, user: userId }).lean();
    db.disconnect();

    if (!order) return null;

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    console.log('error in getOrderByIdAndUser');
    return null;
  }
};

export const getOrdersByUser = async (userId: string): Promise<IOrder[]> => {
  if (!isValidObjectId(userId)) return [];
  try {
    db.connect();

    console.log(userId);

    const orders = await Order.find({ user: userId }).lean();

    db.disconnect();

    if (!orders) return [];

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.log('error in getOrdersByUser');
    return [];
  }
};
