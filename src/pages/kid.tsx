import { Typography } from '@mui/material';
import { useFetchProducts } from '../hooks';
import { ShopLayout } from '../components/layouts';
import { ProductsList } from '../components/products';
import { FullScreenLoading } from '../components/ui';

const KidPage = () => {
  const { products, isLoading } = useFetchProducts('/product?gender=kid');
  return (
    <ShopLayout title='Niños - Teslo Shop' description='Ropas para niños y niñas' imageFullUrl='http://placeimg.com/640/480/nature'>
      <Typography variant='h1' component='h1'>
        La mejor colección Teslo para
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Niños
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductsList products={products} />}
    </ShopLayout>
  );
};

export default KidPage;
