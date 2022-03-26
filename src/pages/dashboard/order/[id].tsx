import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';
import { CartList, OrderSumary } from '../../../components/cart';
import { DashboardLayout } from '../../../components/layouts';
import { ICartProduct, IOrder } from '../../../interfaces';
import { orderController } from '../../../app/controllers';
import { countries } from '../../../app/database/seeders';

type OrderProps = {
  order: IOrder;
};

const OrderPage: NextPage<OrderProps> = ({ order }) => {
  const [isMounted, setIsMounted] = useState(false);

  const { orderItems, isPaid, shippingAddress, subTotal, tax, total, orderNumber, numberOfItems } = order;
  const { name, surnames, country, email, city, address, postalCode, telephone } = shippingAddress;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <DashboardLayout title={`Resumen de la orden ${orderNumber}`} subTitle={`Orden: ${orderNumber}`} icon={<AirplaneTicketOutlined />}>
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
                ) : (
                  <Chip sx={{ my: 2 }} label='Pago pendiente' variant='outlined' color='error' icon={<CreditCardOffOutlined />} />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { id } = query as { id: string };

  const order = await orderController.getOrderById(id);

  if (!order) {
    return {
      redirect: {
        destination: '/dashboard/order',
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
