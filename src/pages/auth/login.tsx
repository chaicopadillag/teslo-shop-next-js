import { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { signIn, getSession, getProviders } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { Box, Button, Chip, Grid, Link, TextField, Typography, Divider } from '@mui/material';
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
  // const { login } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const [providers, setProviders] = useState<any>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>();

  const onSubmitFormValues = async ({ email, password }: FormValuesType) => {
    setShowError(false);
    signIn('credentials', { email, password });
    // try {
    //   const isLoggedIn = await login(email, password);
    //   if (isLoggedIn) {
    //     const lastPath = router.query.p?.toString() || '/';
    //     router.replace(lastPath);
    //   } else {
    //     setShowError(true);
    //     setTimeout(() => setShowError(false), 5000);
    //   }
    // } catch (error) {
    //   console.log('error login');
    // }

    // if (axios.isAxiosError(error)) {
    // setShowError(true);
    // setTimeout(() => setShowError(false), 5000);
    //   console.log('message server validate', error.response?.data.message);
    //   console.log('status code', error.response?.status);
    //   console.log('status text', error.response?.statusText);
    //   alert(error.response?.data.message);
    // }
  };

  useEffect(() => {
    getProviders().then((providers) => setProviders(providers));
  }, []);

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
              <NextLink href={router.query.p ? `/auth/register?p=${router.query.p.toString()}` : '/auth/register'} passHref>
                <Link underline='hover'>¿No tienes una cuenta? Regístrate</Link>
              </NextLink>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' justifyContent='center'>
              <Divider sx={{ width: '100%', mb: 2 }} />
              {Object.values(providers)
                .filter((provider: any) => provider.id !== 'credentials')
                .map((provider: any) => (
                  <Button onClick={() => signIn(provider.id)} key={provider.id} variant='outlined' color='primary' fullWidth sx={{ mb: 1 }}>
                    {provider.name}
                  </Button>
                ))}
            </Grid>
          </Grid>
        </form>
      </Box>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req });

  const { p = '/' } = query as { p: string };

  if (session) {
    return {
      redirect: {
        destination: p,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
