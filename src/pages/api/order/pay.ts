import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
  message: string;
};

export default function handlerPay(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return payOrderInPaypal(req, res);

    default:
      return res.status(405).json({
        message: 'Method Not Allowed',
      });
  }
}

/**
 *
 * @param req
 * @param res
 * @returns
 */
const payOrderInPaypal = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { error, message, token } = await getPaypalBearerToken();

    if ((error && message) || !token) {
      throw new Error(message);
    }

    return res.status(200).json({
      message: token,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || 'Se ha producido un error al procesar el pago',
    });
  }
};

const getPaypalBearerToken = async () => {
  try {
    const NEXT_PUBLIC_PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT || '';
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET || '';
    const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL || '';

    const basicToken64 = Buffer.from(`${NEXT_PUBLIC_PAYPAL_CLIENT}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');

    const headers = {
      Authorization: `Basic ${basicToken64}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const body = new URLSearchParams({
      grant_type: 'client_credentials',
    });

    const { data } = await axios.post(PAYPAL_OAUTH_URL, body, { headers });

    return {
      error: false,
      token: data.access_token,
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return {
        error: true,
        message: JSON.stringify(error.response?.data) || 'Error al obtener el token de acceso desde PayPal',
      };
    }

    return {
      error: true,
      message: error.message || 'Error al obtener el Bearer Token',
    };
  }
};
