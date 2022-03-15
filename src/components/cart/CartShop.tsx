import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CartList } from '.';
import { OrderSumary } from '.';

export const CartShop = () => {
  return (
    <>
      <Typography variant='h1' component='h1'>
        Carrito
      </Typography>
      <Grid container>
        <CartList editable />
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2' component='h2'>
                Orden
              </Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSumary />
              <Box sx={{ mt: 3 }}>
                <Button color='secondary' className='circular-btn' fullWidth sx={{ padding: '8px 0' }}>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
