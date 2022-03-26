import { useContext, useState } from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ShopLayout } from '../../components/layouts';
import { ItemProductCounter, ProductSlideshow, SizeProductSelector } from '../../components/products';
import { ICartProduct, IProduct, ISize } from '../../interfaces';
import { productController } from '../../app/controllers';
import { CartContext } from '../../contexts';
import { useRouter } from 'next/router';
import { currency } from '../../helpers';

type ProductPageProps = {
  product: IProduct;
};

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  const { push } = useRouter();
  const { addProductToCart } = useContext(CartContext);

  const [temCartProduct, setTemCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const selectSize = (size: ISize) => {
    setTemCartProduct((prod) => ({ ...prod, size }));
  };

  const handleChangeQuantity = (quantity: number) => {
    setTemCartProduct((prod) => ({ ...prod, quantity }));
  };

  const handleAddProducToCart = () => {
    if (!temCartProduct.size) return;

    if (temCartProduct.quantity === 0) return;

    addProductToCart(temCartProduct);

    push('/cart');
  };

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
              {currency.format(product.price)}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2' component='h6'>
                Cantidad
              </Typography>
              <ItemProductCounter value={temCartProduct.quantity} maxValue={product.inStock} onChange={handleChangeQuantity} />
              <SizeProductSelector selectedSize={temCartProduct.size} sizes={product.sizes} onChangeSize={selectSize} />
            </Box>

            {product.inStock === 0 ? (
              <Chip label='Producto no disponible' color='error' variant='outlined' />
            ) : (
              <Button
                onClick={handleAddProducToCart}
                startIcon={temCartProduct.size !== undefined && <AddShoppingCartIcon />}
                sx={{ padding: '8px 0' }}
                color='secondary'
                className='circular-btn'
              >
                {temCartProduct.size === undefined ? 'Seleccionar talla' : 'Agregar al carrito'}
              </Button>
            )}
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
      product: {
        ...product,
        images: product.images.map((image) => (image.includes('https://') ? image : `${process.env.APP_URL}/products/${image}`)),
      },
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
