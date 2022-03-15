import { Divider, Grid, Typography } from '@mui/material';

export const OrderSumary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>N° Productos</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>4</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Sub total</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>$155.36</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuesto (18%)</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>$18.36</Typography>
      </Grid>
      <Grid item xs={6}>
        <Divider sx={{ my: 1 }} />
        <Typography variant='subtitle1'>Total</Typography>
      </Grid>
      <Grid item xs={6} display='flex' marginTop={2} justifyContent='end'>
        <Typography variant='subtitle1'>$160.60</Typography>
      </Grid>
    </Grid>
  );
};
