import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography, Chip } from '@mui/material';
import { CartContext } from '../../contexts';
import { countries } from '../../app/database/seeders';
import { ShopLayout } from '../../components/layouts';
import { CartList, OrderSumary } from '../../components/cart';

const SummaryPage = () => {
  const router = useRouter();
  const {
    shippingAddress,
    orderSumary: { quantityItems },
    processOrder,
  } = useContext(CartContext);

  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!shippingAddress) {
    return (
      <ShopLayout title='Resumen de orden' description='Resumen de orden' imageFullUrl=''>
        <Typography variant='h1' component='h1'>
          Resumen de orden
        </Typography>
        <Grid container>
          <Box>
            <NextLink href='/checkout/address' passHref>
              <Link>
                <Button color='secondary' className='circular-btn' fullWidth>
                  Llenar dirección
                </Button>
              </Link>
            </NextLink>
          </Box>
        </Grid>
      </ShopLayout>
    );
  }
  const { name, surnames, country, email, city, address, postalCode, telephone } = shippingAddress;

  const handleOrder = async () => {
    setIsPosting(true);
    setErrorMessage('');
    const { hasError, message, data } = await processOrder();
    if (hasError) {
      setErrorMessage(message);
      setIsPosting(false);
      return;
    }

    router.push(`/orders/${data._id}`);
  };

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
                <Button onClick={handleOrder} color='secondary' className='circular-btn' disabled={isPosting} fullWidth sx={{ padding: '8px 0' }}>
                  Confirmar orden
                </Button>
                {errorMessage && <Chip color='error' variant='outlined' label={errorMessage} sx={{ width: '100%', mt: 1 }} />}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
