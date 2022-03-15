import { Typography } from '@mui/material';
import { CartShop, EmptyCart } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';

const Cartpage = () => {
  return (
    <ShopLayout title='Carritos - 3 productos' description='carrtio de compras de la tienda' imageFullUrl='http://placeimg.com/640/480/nature'>
      {true ? <CartShop /> : <EmptyCart />}
    </ShopLayout>
  );
};

export default Cartpage;
