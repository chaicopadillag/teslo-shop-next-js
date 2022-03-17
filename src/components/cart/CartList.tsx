import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { Grid, Typography, Link, CardActionArea, CardMedia, Box, IconButton } from '@mui/material';
import { ItemProductCounter } from '../products';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { CartContext } from '../../contexts';

type CartListProps = {
  editable?: boolean;
};

export const CartList: FC<CartListProps> = ({ editable = false }) => {
  const { cart } = useContext(CartContext);

  return (
    <Grid item xs={12} sm={7}>
      {cart.map((product) => (
        <Grid container spacing={2} key={`/product/${product.slug}-${product.size}`} sx={{ mb: 1 }}>
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
              {editable && <ItemProductCounter value={product.quantity} maxValue={0} onChange={() => {}} />}
            </Box>
          </Grid>
          <Grid item xs={12} sm={2} display='flex' alignItems='center' flexDirection='column'>
            <Typography variant='subtitle1'>$ {product.price}</Typography>
            {editable && (
              <IconButton title='Elimincar del carrito'>
                <RemoveShoppingCartOutlined />
              </IconButton>
            )}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
