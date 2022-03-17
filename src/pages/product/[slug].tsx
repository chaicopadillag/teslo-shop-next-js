import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ShopLayout } from '../../components/layouts';
import { ItemProductCounter, ProductSlideshow, SizeProductSelector } from '../../components/products';
import { IProduct } from '../../interfaces';
import { productController } from '../../app/controllers';

type ProductPageProps = {
  product: IProduct;
};

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  return (
    <ShopLayout title={product.title} description={product.description} imageFullUrl={product.images[0]}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>
              {product.title}
            </Typography>
            <Typography variant='subtitle1' component='h2'>
              ${product.price}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2' component='h6'>
                Cantidad
              </Typography>
              <ItemProductCounter />
              <SizeProductSelector sizes={product.sizes} />
            </Box>
            <Button startIcon={<AddShoppingCartIcon />} sx={{ padding: '8px 0' }} color='secondary' className='circular-btn'>
              Agregar al carrito
            </Button>
            {/* <Chip label='Producto no disponible' color='error' variant='outlined' /> */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2' component='h2'>
                Descripción
              </Typography>
              <Typography variant='body1' component='p'>
                {product.description}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const products = await productController.getProductsWithSlug();

  const paths = products.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };

  const product = await productController.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 864000,
  };
};

export default ProductPage;

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug = '' } = params as { slug: string };

//   const product = await productController.getProductBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/404',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };
