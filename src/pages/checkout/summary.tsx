import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useContext } from 'react';
import { countries } from '../../app/database/seeders';
import { CartList, OrderSumary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../contexts';

const SummaryPage = () => {
  const {
    shippingAddress,
    orderSumary: { quantityItems },
  } = useContext(CartContext);

  if (!shippingAddress) {
    return <>No hay address</>;
  }
  const { name, surnames, country, email, city, address, postalCode, telephone } = shippingAddress;

  return (
    <ShopLayout title='Resumen de orden' description='Resumen de orden' imageFullUrl=''>
      <Typography variant='h1' component='h1'>
        Resumen de orden
      </Typography>
      <Grid container>
        <CartList />
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2' component='h2'>
                Resumen ({quantityItems === 1 ? '1 Producto' : `${quantityItems} Productos`})
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                <NextLink href='/checkout/address' passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>

              <Typography>{`${name} ${surnames}`}</Typography>
              <Typography>{address}</Typography>
              <Typography>{`${city}, ${postalCode}`}</Typography>
              <Typography>{countries.find((c) => c.code === country)?.name}</Typography>
              <Typography> {`${email} ${telephone}`} </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>
              <OrderSumary />
              <Box sx={{ mt: 3 }}>
                <Button color='secondary' className='circular-btn' fullWidth sx={{ padding: '8px 0' }}>
                  Confirmar orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
