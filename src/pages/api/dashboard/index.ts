import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../app/database';
import { Order, Product, User } from '../../../app/models';

type Data =
  | {
      message: string;
    }
  | {
      numberOrders: number;
      paidOrders: number;
      notPaidOrders: number;
      numberClients: number;
      numberProducts: number;
      productsNotInStock: number;
      productsLowInStock: number;
    };

export default function handerDashboard(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getAnalitycs(req, res);

    default:
      return res.status(405).json({
        message: 'Method not allowed',
      });
  }
}
const getAnalitycs = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const [numberOrders, paidOrders, numberClients, numberProducts, productsNotInStock, productsLowInStock] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ isPaid: true }),
      User.countDocuments({ role: 'CLIENT' }),
      Product.countDocuments(),
      Product.countDocuments({ inStock: 0 }),
      Product.countDocuments({ inStock: { $lte: 10 } }),
    ]);
    await db.disconnect();

    const notPaidOrders = numberOrders - paidOrders;

    return res.status(200).json({
      numberOrders,
      paidOrders,
      notPaidOrders,
      numberClients,
      numberProducts,
      productsNotInStock,
      productsLowInStock,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
