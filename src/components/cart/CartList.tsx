import { FC } from 'react';
import NextLink from 'next/link';
import { Grid, Typography, Link, CardActionArea, CardMedia, Box, IconButton } from '@mui/material';
import { initialData } from '../../database/products';
import { ItemProductCounter } from '../products';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';

const products = [initialData.products[0], initialData.products[1], initialData.products[2], initialData.products[3]];

type CartListProps = {
  editable?: boolean;
};

export const CartList: FC<CartListProps> = ({ editable = false }) => {
  return (
    <Grid item xs={12} sm={7}>
      {products.map((product) => (
        <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>
          <Grid item xs={12} sm={3}>
            <NextLink href='/product/slug' passHref>
              <Link>
                <CardActionArea>
                  <CardMedia image={`/products/${product.images[0]}`} title={product.title} component='img' sx={{ borderRadius: '5px' }} />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body2'>{product.title}</Typography>
              <Typography variant='body2'>
                Talla: <strong>{product.sizes[3]}</strong>
              </Typography>
              {editable && <ItemProductCounter />}
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
