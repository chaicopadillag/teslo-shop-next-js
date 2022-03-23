import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

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
    return res.status(201).json({
      message: 'Orders saved successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong.',
    });
  }
};
