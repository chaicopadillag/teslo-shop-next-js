import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { CartList, OrderSumary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';

const SummaryPage = () => {
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
