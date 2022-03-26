import NextLink from 'next/link';
import { Box, Button, CardMedia, Chip, CircularProgress, Grid, Link } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DashboardLayout } from '../../../components/layouts';
import useSWR from 'swr';
import { IProduct } from '../../../interfaces';
import { currency } from '../../../helpers';
import { AddOutlined, ConfirmationNumberOutlined } from '@mui/icons-material';

const columns: GridColDef[] = [
  {
    field: 'image',
    headerName: 'Imagen',
    renderCell: ({ row }) => {
      return (
        <a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
          <CardMedia className='fadeIn' component='img' image={row.image} alt={row.title} />
        </a>
      );
    },
  },
  {
    field: 'product',
    headerName: 'Producto',
    width: 300,
    renderCell: ({ row }) => {
      return (
        <NextLink href={`/dashboard/product/${row.slug}`} passHref>
          <Link underline='always'>{row.product}</Link>
        </NextLink>
      );
    },
  },
  { field: 'gender', headerName: 'Género', width: 200 },
  { field: 'type', headerName: 'Tipo', width: 200 },
  {
    field: 'inStock',
    headerName: 'Stock',
    width: 200,
    renderCell: ({ row }) => {
      return row.inStock <= 0 ? <Chip variant='outlined' label='Agotado' color='error' /> : row.inStocke;
    },
  },
  { field: 'price', headerName: 'Precio', width: 200 },
  { field: 'size', headerName: 'Talla', width: 200 },
];

const ProductsPage = () => {
  const { data, error } = useSWR<IProduct[]>('/api/dashboard/product');

  if (!data) {
    return (
      <DashboardLayout title='Produstos' subTitle='Mantenimiento de productos' icon={<ConfirmationNumberOutlined />}>
        <Grid container className='fadeIn'>
          <Grid container justifyContent='center'>
            <CircularProgress />
          </Grid>
        </Grid>
      </DashboardLayout>
    );
  }
  const rows = data.map((prod, index) => ({
    id: prod._id,
    image: prod.images[0],
    product: prod.title,
    gender: prod.gender,
    type: prod.type,
    inStock: prod.inStock,
    price: currency.format(prod.price),
    size: prod.sizes.join(', '),
    slug: prod.slug,
  }));

  return (
    <DashboardLayout title={'Productos'} subTitle={'Listado de productos'} icon={<ConfirmationNumberOutlined />}>
      <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
        <Button startIcon={<AddOutlined />} color='secondary' href='/dashboard/product/create'>
          Crear producto
        </Button>
      </Box>
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default ProductsPage;
