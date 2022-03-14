import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts';

const Home: NextPage = () => {
  return (
    <ShopLayout title='Teslo Shop - Home' description='Fuga vel consequatur repudiandae commodi vel ut.' imageFullUrl='http://placeimg.com/640/480/nature'>
      <Typography variant='h1' component='h1'>
        Tienda
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
    </ShopLayout>
  );
};

export default Home;
