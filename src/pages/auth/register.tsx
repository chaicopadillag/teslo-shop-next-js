import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layouts';
import { ErrorOutline } from '@mui/icons-material';
import { validations } from '../../helpers';
import { AuthContext } from '../../contexts';

type FormValuesType = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const { register: registerUser } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Error al registrar');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>();

  const onSubmitFormValues = async ({ name, email, password }: FormValuesType) => {
    try {
      const { hasError, message } = await registerUser(name, email, password);
      if (hasError) {
        setShowError(true);
        setErrorMessage(message);
        setTimeout(() => setShowError(false), 5000);
      } else {
        const lastPath = router.query.p?.toString() || '/';
        router.replace(lastPath);
      }
    } catch (error) {
      console.log('error register');
      setErrorMessage('Error al registrar');
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      // console.log(error);

      // if (axios.isAxiosError(error)) {
      //   setShowError(true);
      //   setTimeout(() => setShowError(false), 5000);
      //   setErrorMessage(error.response?.data.message);
      //   console.log('message server validate', error.response?.data.message);
      //   console.log('status code', error.response?.status);
      //   console.log('status text', error.response?.statusText);
      //   // alert(error.response?.data.message);
      // }
    }
  };
  return (
    <AuthLayout title='Login'>
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <form onSubmit={handleSubmit(onSubmitFormValues)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1' textAlign='center'>
                Registrarse
              </Typography>
              <Chip label={errorMessage} color='error' icon={<ErrorOutline />} className='fadeIn' sx={{ display: showError ? 'flex' : 'none' }} />
            </Grid>
            <Grid item xs={12}>
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
                label='Nombre completo'
                type='text'
                variant='filled'
                fullWidth
              />
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
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres',
                  },
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
                Crear cuenta
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='center'>
              <NextLink href={router.query.p ? `/auth/login?p=${router.query.p.toString()}` : '/auth/login'} passHref>
                <Link underline='hover'>¿Ya tienes una cuenta? Inicia sesión</Link>
              </NextLink>
            </Grid>
          </Grid>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
