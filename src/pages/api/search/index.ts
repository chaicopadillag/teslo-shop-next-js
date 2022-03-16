import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  return res.status(422).json({
    message: 'Debe especificar una palabra clave de busqueda',
  });
}
