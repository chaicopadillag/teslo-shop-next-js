import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { Grid, Typography, Link, CardActionArea, CardMedia, Box, IconButton } from '@mui/material';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { ItemProductCounter } from '../products';
import { CartContext } from '../../contexts';
import { ICartProduct } from '../../interfaces';
import { currency } from '../../helpers';

type CartListProps = {
  editable?: boolean;
  products?: ICartProduct[];
};

export const CartList: FC<CartListProps> = ({ editable = false, products }) => {
  const { cart, updateProductQuantityInCart, removeProductCart } = useContext(CartContext);

  const changeQuantity = (product: ICartProduct, quantity: number) => {
    updateProductQuantityInCart({ ...product, quantity });
  };

  const productsInCart = products || cart;

  return (
    <Grid item xs={12} sm={7}>
      {productsInCart.map((product) => (
        <Grid container spacing={2} key={`/product/${product.slug}_${product.size}`} sx={{ mb: 1 }}>
          <Grid item xs={12} sm={3}>
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia image={`/products/${product.image}`} title={product.title} component='img' sx={{ borderRadius: '5px' }} />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body2'>{product.title}</Typography>
              <Typography variant='body2'>
                Talla: <strong>{product.size}</strong>
              </Typography>
              {editable ? (
                <ItemProductCounter value={product.quantity} maxValue={5} onChange={(q) => changeQuantity(product, q)} />
              ) : (
                <Typography variant='subtitle2'>
                  {product.quantity} {product.quantity === 1 ? 'producto' : 'productos'}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={2} display='flex' alignItems='center' flexDirection='column'>
            <Typography variant='subtitle1'>{currency.format(product.price)}</Typography>
            {editable && (
              <IconButton title='Elimincar del carrito' onClick={() => removeProductCart(product)}>
                <RemoveShoppingCartOutlined />
              </IconButton>
            )}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
