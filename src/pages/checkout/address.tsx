import { useContext } from 'react';
import { CartContext } from '../../contexts';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Cookie from 'js-cookie';
import { Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { countries } from '../../app/database/seeders';
import { ShopLayout } from '../../components/layouts';
import { validations } from '../../helpers';
import { ShippingAddressType } from '../../interfaces';

const loadAddress = (): ShippingAddressType => {
  const address: ShippingAddressType = JSON.parse(Cookie.get('address') || '{}');
  return {
    name: address.name || '',
    surnames: address.surnames || '',
    country: address.country || 'PER',
    email: address.email || '',
    city: address.city || '',
    address: address.address || '',
    postalCode: address.postalCode || '',
    telephone: address.telephone || '',
  };
};

const AddressPage = () => {
  const { shippingAddress, setShippingAddress } = useContext(CartContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddressType>({
    defaultValues: loadAddress(),
  });

  const onSubmit = (data: ShippingAddressType) => {
    Cookie.set('address', JSON.stringify(data), { expires: 1, path: '/', sameSite: 'strict' });
    setShippingAddress(data);
    router.push('/checkout/summary');
  };
  return (
    <ShopLayout title='Dirección' description='Confirmar direccion del destino' imageFullUrl=''>
      <Typography variant='h1' component='h1'>
        Dirección
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('name', {
                required: 'El nombre es requerido',
                minLength: {
                  value: 3,
                  message: 'El nombre debe tener al menos 3 caracteres',
                },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
              label='Nombre'
              variant='filled'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('surnames', {
                required: 'Los apellidos son requeridos',
                minLength: {
                  value: 3,
                  message: 'Los apellidos deben tener al menos 3 caracteres',
                },
              })}
              error={!!errors.surnames}
              helperText={errors.surnames?.message}
              label='Apellidos'
              variant='filled'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('email', {
                required: 'El email es requerido',
                validate: validations.isEmail,
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              label='Correo eléctronico'
              variant='filled'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('telephone', {
                required: 'El teléfono es requerido',
                minLength: {
                  value: 5,
                  message: 'El teléfono debe tener al menos 5 caracteres',
                },
              })}
              error={!!errors.telephone}
              helperText={errors.telephone?.message}
              label='Teléfono'
              variant='filled'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('address', {
                required: 'La dirección es requerida',
                minLength: {
                  value: 5,
                  message: 'La dirección debe tener al menos 5 caracteres',
                },
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
              label='Direccion'
              variant='filled'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Select
                value={shippingAddress?.country || 'PER'}
                {...register('country', {
                  required: 'El país es requerido',
                })}
                error={!!errors.country}
                variant='filled'
                label='País'
                onChange={(e) => setShippingAddress({ ...shippingAddress!, country: e.target.value })}
              >
                {countries.map(({ code, name }) => (
                  <MenuItem key={code} value={code}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('postalCode', {
                required: 'El código postal es requerido',
                minLength: {
                  value: 3,
                  message: 'El código postal debe tener al menos 3 caracteres',
                },
              })}
              error={!!errors.postalCode}
              helperText={errors.postalCode?.message}
              label='Codigo Postal'
              variant='filled'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('city', {
                required: 'La ciudad es requerida',
                minLength: {
                  value: 3,
                  message: 'La ciudad debe tener al menos 3 caracteres',
                },
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
              label='Ciudad'
              variant='filled'
              fullWidth
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }} display='flex' justifyContent='center'>
          <Button type='submit' color='secondary' className='circular-btn' size='large'>
            Continuar con el pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export default AddressPage;
