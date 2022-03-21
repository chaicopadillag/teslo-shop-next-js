import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '../../contexts';
import { validations } from '../../helpers';
import { AuthLayout } from '../../components/layouts';

type FormValuesType = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>();

  const onSubmitFormValues = async ({ email, password }: FormValuesType) => {
    try {
      const isLoggedIn = await login(email, password);
      if (isLoggedIn) {
        router.replace('/');
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 5000);
      }
    } catch (error) {
      console.log('error login');
    }

    // if (axios.isAxiosError(error)) {
    // setShowError(true);
    // setTimeout(() => setShowError(false), 5000);
    //   console.log('message server validate', error.response?.data.message);
    //   console.log('status code', error.response?.status);
    //   console.log('status text', error.response?.statusText);
    //   alert(error.response?.data.message);
    // }
  };

  return (
    <AuthLayout title='Login'>
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <form onSubmit={handleSubmit(onSubmitFormValues)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1' textAlign='center'>
                Iniciar Sesión
              </Typography>
              <Chip label='Credenciales incorrectas' color='error' icon={<ErrorOutline />} className='fadeIn' sx={{ display: showError ? 'flex' : 'none' }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('email', {
                  required: 'El correo es requerido',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                label='Correo'
                type='email'
                variant='filled'
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('password', {
                  required: 'La contraseña es requerida',
                  minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                label='Contraseña'
                type='password'
                variant='filled'
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' color='secondary' className='circular-btn' size='large' fullWidth>
                Iniciar
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='center'>
              <NextLink href='/auth/register' passHref>
                <Link underline='hover'>¿No tienes una cuenta? Regístrate</Link>
              </NextLink>
            </Grid>
          </Grid>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
