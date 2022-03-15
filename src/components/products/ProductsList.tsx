import { Grid } from '@mui/material';
import { FC } from 'react';
import { ProductCard } from '.';
import { IProduct } from '../../interfaces';

type ProductListProps = {
  products: IProduct[];
};

export const ProductsList: FC<ProductListProps> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <ProductCard product={product} key={product.slug} />
      ))}
    </Grid>
  );
};
