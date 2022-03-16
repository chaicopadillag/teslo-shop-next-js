import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../app/database';
import { Product } from '../../../app/models';
import { seeder } from '../../../app/database/seeders';

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(422).json({ message: 'Está acción esta permitida solo en desarrollo' });
  }

  if (req.method === 'PATCH') {
    return sendSeedProduct(res);
  } else {
    return res.status(405).json({ message: 'Method Not Allowed in Endpoint' });
  }
}

async function sendSeedProduct(res: NextApiResponse<Data>) {
  try {
    db.connect();
    await Product.deleteMany();
    await Product.insertMany(seeder.initialData.products);
    db.disconnect();
    return res.status(201).json({ message: 'Send seeders success full' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error server app in seed' });
  }
}
