import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../app/database';
import { Product } from '../../../app/models';
import { IProduct } from '../../../interfaces';

type Data =
  | {
      message: string;
    }
  | IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProductBySlug(req, res);
    default:
      return res.status(405).json({
        message: 'Method Not Allowed',
      });
  }
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { slug } = req.query as { slug: string };

    db.connect();

    const product = await Product.findOne({ slug }).select('-__v').lean();

    db.disconnect();

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
