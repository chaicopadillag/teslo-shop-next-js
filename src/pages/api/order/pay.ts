import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { isValidObjectId } from 'mongoose';
import { IOrderDetailsPaypal } from '../../../interfaces';
import { db } from '../../../app/database';
import { Order } from '../../../app/models';

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
    const PAYPAL_ORDERS_URL = process.env.PAYPAL_ORDERS_URL || '';

    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const { orderId = '', transactionId = '' } = req.body as { orderId: string; transactionId: string };

    if (!isValidObjectId(orderId) || !transactionId) {
      return res.status(422).json({
        message: 'ID de Order o ID de Transacción no válidos',
      });
    }

    const { error, message, token } = await getPaypalBearerToken();

    if ((error && message) || !token) {
      throw new Error(message);
    }

    const { data } = await axios.get<IOrderDetailsPaypal>(`${PAYPAL_ORDERS_URL}/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (data.status !== 'COMPLETED') {
      return res.status(422).json({
        message: 'La transacción no ha sido completada',
      });
    }

    if (data.purchase_units.length <= 0) {
      return res.status(422).json({
        message: 'No se encontró la transacción en PayPal para este pedido',
      });
    }

    db.connect();
    const order = await Order.findById(orderId);

    if (!order) {
      db.disconnect();
      return res.status(422).json({
        message: 'No se encontró el pedido en la base de datos',
      });
    }

    if (order.total !== Number(data.purchase_units[0].amount.value)) {
      db.disconnect();
      return res.status(422).json({
        message: 'El total del pedido no coincide con el total de PayPal',
      });
    }

    order.isPaid = true;
    order.transactionId = transactionId;
    await order.save();

    return res.status(200).json({
      message: 'Pago realizado con éxito',
    });
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return res.status(400).json({
        message: JSON.stringify(error.response?.data) || 'Error al obtener el detalle del orden desde PayPal',
      });
    }

    console.log(error);

    return res.status(400).json({
      message: error.message || 'Se ha producido un error al procesar el pago',
    });
  }
};

/**
 *
 * @returns {error: boolean, message: string, token: string}
 */
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

    console.log(error);
    return {
      error: true,
      message: error.message || 'Error al obtener el Bearer Token',
    };
  }
};
