import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts';
import { ProductsList } from '../components/products';
import { useFetchProducts } from '../hooks';
import { FullScreenLoading } from '../components/ui';

const HomePage: NextPage = () => {
  const { products, isLoading } = useFetchProducts('/product');
  return (
    <ShopLayout title='Teslo Shop - Home' description='Fuga vel consequatur repudiandae commodi vel ut.' imageFullUrl='http://placeimg.com/640/480/nature'>
      <Typography variant='h1' component='h1'>
        La mejor colección Teslo
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductsList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
