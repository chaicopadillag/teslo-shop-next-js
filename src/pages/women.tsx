import { Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts';
import { useFetchProducts } from '../hooks';
import { ProductsList } from '../components/products';
import { FullScreenLoading } from '../components/ui';

const WomenPage = () => {
  const { products, isLoading } = useFetchProducts('/product?gender=women');
  return (
    <ShopLayout title='Mujeres - Teslo Shop' description='Ropas para mujeres' imageFullUrl='http://placeimg.com/640/480/nature'>
      <Typography variant='h1' component='h1'>
        La mejor colección Teslo para
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Mujeres
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductsList products={products} />}
    </ShopLayout>
  );
};

export default WomenPage;
