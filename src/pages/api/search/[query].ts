import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../app/database';
import { Product } from '../../../app/models';
import { IProduct } from '../../../interfaces';

type Data =
  | {
      message: string;
    }
  | IProduct[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return searchProductByQuery(req, res);

    default:
      return res.status(405).json({
        message: 'Method Not Allowed',
      });
  }
}
const searchProductByQuery = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { query = '' } = req.query as { query: string };

    if (query.length === 0) {
      return res.status(422).json({
        message: 'la palabra clave de busqueda es requerida',
      });
    }

    db.connect();

    const productos = await Product.find({ $text: { $search: query.toLocaleLowerCase() } })
      .select('title images price inStock slug -_id')
      .lean();

    db.disconnect();

    return res.json(productos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
