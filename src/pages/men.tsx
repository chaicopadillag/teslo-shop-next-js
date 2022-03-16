import { Typography } from '@mui/material';
import { useFetchProducts } from '../hooks';
import { ShopLayout } from '../components/layouts';
import { FullScreenLoading } from '../components/ui';
import { ProductsList } from '../components/products';

const MenPage = () => {
  const { products, isLoading } = useFetchProducts('/product?gender=men');
  return (
    <ShopLayout title='Hombre - Teslo Shop' description='Ropas para hombres' imageFullUrl='http://placeimg.com/640/480/nature'>
      <Typography variant='h1' component='h1'>
        La mejor colección Teslo para
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Hombres
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductsList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
