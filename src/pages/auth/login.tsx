import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { AuthLayout } from '../../components/layouts';

const LoginPage = () => {
  return (
    <AuthLayout title='Login'>
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography></Typography>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
