import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import NextLink from 'next/link';
import React from 'react';
import { AuthLayout } from '../../components/layouts';

const LoginPage = () => {
  return (
    <AuthLayout title='Login'>
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h1' component='h1' textAlign='center'>
              Iniciar Sesión
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label='Correo' type='email' variant='filled' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Contraseña' type='password' variant='filled' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button color='secondary' className='circular-btn' size='large' fullWidth>
              Iniciar
            </Button>
          </Grid>
          <Grid item xs={12} display='flex' justifyContent='center'>
            <NextLink href='/auth/register' passHref>
              <Link underline='hover'>¿No tienes una cuenta? Regístrate</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;