import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../app/database';
import { Order } from '../../../app/models';
import { IOrder } from '../../../interfaces';

type Data =
  | {
      message: string;
    }
  | IOrder[];

export default function handlerOder(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getAllOders(req, res);

    default:
      return res.status(405).json({
        message: 'Method Not Allowed',
      });
  }
}

const getAllOders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const orders = await Order.find({}).sort({ createdAt: -1 }).populate('user', 'name email').lean();
    await db.disconnect();
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
