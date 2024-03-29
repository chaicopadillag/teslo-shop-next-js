import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { CreditCardOffOutlined, CreditScoreOutlined, PaymentOutlined } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography, Chip, CircularProgress } from '@mui/material';
import { CartList, OrderSumary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { ICartProduct, IOrder } from '../../interfaces';
import { orderController } from '../../app/controllers';
import { countries } from '../../app/database/seeders';
import axios from 'axios';
import { tesloApi } from '../../services';

type OrderResponseBody = {
  id: string;
  status: 'COMPLETED' | 'SAVED' | 'APPROVED' | 'VOIDED' | 'PAYER_ACTION_REQUIRED';
};

type OrderProps = {
  order: IOrder;
};

const OrderPage: NextPage<OrderProps> = ({ order }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const { orderItems, isPaid, shippingAddress, subTotal, tax, total, orderNumber, numberOfItems } = order;
  const { name, surnames, country, email, city, address, postalCode, telephone } = shippingAddress;

  const onPayment = async (detail: OrderResponseBody) => {
    if (detail.status !== 'COMPLETED') {
      return alert('Payment failed');
    }
    setIsPaying(true);
    try {
      const { data } = await tesloApi.post(`/order/pay`, {
        orderId: order._id,
        transactionId: detail.id,
      });
      // alert(data.message);
      router.reload();
    } catch (error) {
      setIsPaying(false);
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <ShopLayout title={`Resumen de la orden ${orderNumber}`} description='Resumen de la orden' imageFullUrl=''>
      <Typography variant='h2' component='h2'>
        Resumen de orden: {orderNumber}
      </Typography>

      {isPaid ? (
        <Chip sx={{ my: 2 }} label='Orden pagada' variant='outlined' color='success' icon={<CreditScoreOutlined />} />
      ) : (
        <Chip sx={{ my: 2 }} label='Pendiente de pago' variant='outlined' color='error' icon={<CreditCardOffOutlined />} />
      )}

      <Grid container className='fadeIn'>
        {isMounted ? <CartList products={orderItems as ICartProduct[]} /> : <Grid item xs={12} sm={7}></Grid>}
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2' component='h2'>
                Resumen ( {orderItems.length} {orderItems.length === 1 ? 'producto' : 'productos'})
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Dirección de entrega</Typography>
              </Box>

              <Typography>{`${name} ${surnames}`}</Typography>
              <Typography>{address}</Typography>
              <Typography>{`${city}, ${postalCode}`}</Typography>
              <Typography>{countries.find((c) => c.code === country)?.name}</Typography>
              <Typography> {`${email} ${telephone}`} </Typography>
              <Divider sx={{ my: 1 }} />
              {isMounted && (
                <OrderSumary
                  sumary={{
                    quantityItems: numberOfItems,
                    subTotal,
                    tax,
                    total,
                  }}
                />
              )}
              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}>
                {isPaid ? (
                  <Chip sx={{ my: 2 }} label='Pagado' variant='outlined' color='success' icon={<CreditScoreOutlined />} />
                ) : isPaying ? (
                  <Box display='flex' justifyContent='center' className='fadeIn'>
                    <CircularProgress color='secondary' />
                  </Box>
                ) : (
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: total.toString(),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order!.capture().then((details) => {
                        onPayment(details);
                        // console.log(details);
                        // const name = details.payer.name.given_name;
                        // alert(`Transaction completed by ${name}`);
                      });
                    }}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { id } = query as { id: string };

  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await orderController.getOrderByIdAndUser(id, session.user._id);

  if (!order) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
