import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography, Chip } from '@mui/material';
import NextLink from 'next/link';
import { CartList, OrderSumary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';

const OrderPage = () => {
  return (
    <ShopLayout title='Resumen de la orden 00222' description='Resumen de la orden' imageFullUrl=''>
      <Typography variant='h1' component='h1'>
        Resumen de orden
      </Typography>

      {/* <Chip sx={{ my: 2 }} label='Pendiente de pago' variant='outlined' color='error' icon={<CreditCardOffOutlined />} /> */}
      <Chip sx={{ my: 2 }} label='Orden pagada' variant='outlined' color='success' icon={<CreditScoreOutlined />} />

      <Grid container>
        <CartList />
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2' component='h2'>
                Resumen (3 productos)
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                <NextLink href='/checkout/address' passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>

              <Typography>Voluptatem molestiae magni</Typography>
              <Typography>80753 Ceasar Corner</Typography>
              <Typography>Fond du Lac</Typography>
              <Typography>353-586-2408</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>
              <OrderSumary />
              <Box sx={{ mt: 3 }}>
                <Chip sx={{ my: 2 }} label='Pagar' variant='outlined' color='secondary' icon={<CreditScoreOutlined />} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
