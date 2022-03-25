import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '../../../app/database';
import { Order, Product } from '../../../app/models';
import { IOrder, IUser } from '../../../interfaces';

type Data =
  | {
      message: string;
    }
  | IOrder;

export default function orderHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return saveOrders(req, res);

    default:
      return res.status(405).json({
        message: 'Method not allowed.',
      });
  }
}

const saveOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({
        message: 'Unauthorized.',
      });
    }

    const { numberOfItems, orderItems, shippingAddress, total: totalFront } = req.body as IOrder;

    const productIds = orderItems.map((item) => item._id);

    await db.connect();

    const products = await Product.find({ _id: { $in: productIds } })
      .select('_id price inStock')
      .lean();

    const subTotal = orderItems.reduce((prev, { quantity, _id }) => {
      const price = products.find((prd) => prd._id.toString() === _id.toString())?.price;

      if (!price) throw new Error('Uno de los productos no existe.');

      return prev + price * quantity;
    }, 0);

    const tax = subTotal * Number(process.env.NEXT_PUBLIC_TAX_PERCENTAGE || 0.18);

    const total = subTotal + tax;

    // console.log('total', total);
    // console.log('totalFront', totalFront);
    if (total !== totalFront) throw new Error('El monto total no coincide con el calculado');

    const orderCount = await Order.countDocuments();

    const newOrder: IOrder = {
      orderNumber: `00000${orderCount + 1}`.slice(-6),
      user: session.user as IUser,
      shippingAddress,
      orderItems: orderItems.map((item) => ({
        ...item,
        price: products.find((product) => product._id.toString() === item._id.toString())?.price || 0,
      })),
      numberOfItems,
      subTotal,
      tax,
      total: Math.round(total * 100) / 100,
      isPaid: false,
    };

    const order = await Order.create(newOrder);

    await db.disconnect();

    return res.status(201).json(order);
  } catch (error: any) {
    await db.disconnect();
    return res.status(400).json({
      message: error.message || 'Error al guardar la orden',
    });
  }
};
