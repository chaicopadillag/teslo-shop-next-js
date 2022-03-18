import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../app/database';
import { Product, User } from '../../../app/models';
import { productSeeder, userSeeder } from '../../../app/database/seeders';

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(422).json({ message: 'Está acción esta permitida solo en desarrollo' });
  }

  if (req.method === 'POST') {
    return sendSeedDatabase(res);
  } else {
    return res.status(405).json({ message: 'Method Not Allowed in Endpoint' });
  }
}

async function sendSeedDatabase(res: NextApiResponse<Data>) {
  try {
    db.connect();

    await User.deleteMany();
    await User.insertMany(userSeeder.users);

    await Product.deleteMany();
    await Product.insertMany(productSeeder.products);
    db.disconnect();
    return res.status(201).json({ message: 'Send seeders database success full' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error server app in seed' });
  }
}
