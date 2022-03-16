import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { IProduct } from '../../interfaces';

type ProducCardProps = {
  product: IProduct;
};

export const ProductCard: FC<ProducCardProps> = ({ product }) => {
  const [isHoverImage, setIsHoverImage] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const imageUrl = useMemo(() => {
    return isHoverImage ? `/products/${product.images[1]}` : `/products/${product.images[0]}`;
  }, [isHoverImage, product.images]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} onMouseEnter={() => setIsHoverImage(true)} onMouseLeave={() => setIsHoverImage(false)}>
      <Card>
        <NextLink href='/product/slug' passHref prefetch={false}>
          <Link>
            <CardActionArea>
              <CardMedia className='fadeIn' component='img' image={imageUrl} alt={product.title} onLoad={() => setIsImageLoaded(true)} />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>
      <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>${product.price}</Typography>
      </Box>
    </Grid>
  );
};
