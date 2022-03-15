import { Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ShopLayout } from '../../components/layouts';

const AddressPage = () => {
  return (
    <ShopLayout title='Dirección' description='Confirmar direccion del destino' imageFullUrl=''>
      <Typography variant='h1' component='h1'>
        Dirección
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField label='Nombre' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Apellidos' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Direccion' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Direccion 2 (opcional)' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select variant='filled' label='País' value={1}>
              <MenuItem value={1}>Perú</MenuItem>
              <MenuItem value={2}>Chile</MenuItem>
              <MenuItem value={3}>Ecuador</MenuItem>
              <MenuItem value={4}>Colombia</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Teléfono' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Codigo Postal' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Ciudad' variant='filled' fullWidth />
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }} display='flex' justifyContent='center'>
        <Button color='secondary' className='circular-btn' size='large'>
          Continuar con el pedido
        </Button>
      </Box>
    </ShopLayout>
  );
};

export default AddressPage;
