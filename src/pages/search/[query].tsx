import { GetServerSideProps, NextPage } from 'next';
import { capitalize, Typography } from '@mui/material';
import { productController } from '../../app/controllers';
import { ShopLayout } from '../../components/layouts';
import { ProductsList } from '../../components/products';
import { IProduct } from '../../interfaces';

type SearchPageProps = {
  products: IProduct[];
  isEmpty: boolean;
  query: string;
};

const SearchPage: NextPage<SearchPageProps> = ({ products, isEmpty, query }) => {
  return (
    <ShopLayout title='Teslo Shop - Busqueda' description='Resultados de busqueda' imageFullUrl='http://placeimg.com/640/480/nature'>
      <Typography variant='h1' component='h1'>
        {isEmpty ? `No se encontraron productos de ${capitalize(query)}` : `Resultados de busqueda de ${capitalize(query)}`}
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        {isEmpty ? `Productos que le podría interesar` : `Se encontraron ${products.length} productos de`} {!isEmpty && <strong>{capitalize(query)}</strong>}
      </Typography>
      <ProductsList products={products} />
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if (query.length <= 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  let products = await productController.searchProductsByKeyword(query);

  const isEmpty = products.length <= 0;

  if (isEmpty) {
    products = await productController.getAllProducts();
  }

  return {
    props: {
      products,
      isEmpty,
      query,
    },
  };
};

export default SearchPage;
