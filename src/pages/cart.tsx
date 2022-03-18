import { useContext } from 'react';
import { CartContext } from '../contexts';
import { CartShop, EmptyCart } from '../components/cart';
import { ShopLayout } from '../components/layouts';

const Cartpage = () => {
  const { cart } = useContext(CartContext);
  return (
    <ShopLayout title='Carritos - 3 productos' description='carrtio de compras de la tienda' imageFullUrl='http://placeimg.com/640/480/nature'>
      {cart.length > 0 ? <CartShop /> : <EmptyCart />}
    </ShopLayout>
  );
};

export default Cartpage;
