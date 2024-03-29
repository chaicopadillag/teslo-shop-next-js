import type { NextApiRequest, NextApiResponse } from 'next';
import { db, GENDERS_VALIDS } from '../../../app/database';
import Product from '../../../app/models/Product';
import { IProduct } from '../../../interfaces';

type Data =
  | {
      message: string;
    }
  | IProduct[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);

    default:
      return res.status(405).json({
        message: 'Method Not Allowed',
      });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { gender = 'all' } = req.query as { gender: string };

    let query = {};

    if (gender !== 'all' && GENDERS_VALIDS.includes(gender)) {
      query = { gender };
    }

    await db.connect();

    const products = await Product.find(query).select('title images price inStock slug -_id').lean();

    await db.disconnect();

    const productsArray = products.map((product) => ({
      ...product,
      images: product.images.map((image) => (image.includes('https://') ? image : `${process.env.APP_URL}/products/${image}`)),
    }));
    return res.json(productsArray);
  } catch (error) {
    return res.status(500).json({
      message: `Error: ${JSON.stringify(error)}`,
    });
  }
};
