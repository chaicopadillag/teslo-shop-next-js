import { FC, useContext } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { CartContext } from '../../contexts';
import { currency } from '../../helpers';
import { OrderSumaryType } from '../../contexts/CartContext';

type OrderSumaryProps = {
  sumary?: OrderSumaryType;
};

export const OrderSumary: FC<OrderSumaryProps> = ({ sumary }) => {
  const { orderSumary } = useContext(CartContext);

  const ordSumary = sumary || orderSumary;
  const { quantityItems, subTotal, tax, total } = ordSumary;
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>N° Productos</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>
          {quantityItems} {quantityItems <= 1 ? 'Producto' : 'Productos'}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Sub total</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{currency.format(subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuesto ({100 * Number(process.env.NEXT_PUBLIC_TAX_PERCENTAGE || 0.18)}%)</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{currency.format(tax)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Divider sx={{ my: 1 }} />
        <Typography variant='subtitle1'>Total</Typography>
      </Grid>
      <Grid item xs={6} display='flex' marginTop={2} justifyContent='end'>
        <Typography variant='subtitle1'>{currency.format(total)}</Typography>
      </Grid>
    </Grid>
  );
};
