import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { Typography, Grid, Chip, Link, Button } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts';
import { VisibilityOutlined } from '@mui/icons-material';
import { getSession } from 'next-auth/react';
import { orderController } from '../../app/controllers';
import { IOrder } from '../../interfaces';

const colums: GridColDef[] = [
  { field: 'item', headerName: 'N°', width: 100 },
  { field: 'fullname', headerName: 'Nombre completo', width: 300 },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra si está pagada la orden o no',
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? <Chip color='success' label='Pagada' variant='outlined' /> : <Chip color='error' label='No Pagada' variant='outlined' />;
    },
  },
  {
    field: 'action',
    headerName: 'Acción',
    width: 200,
    sortable: false,

    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link>
            <Button color='primary' startIcon={<VisibilityOutlined />} variant='outlined'>
              Ver orden
            </Button>
          </Link>
        </NextLink>
      );
    },
  },
];

type HistoryProps = {
  orders: IOrder[];
};

const HistoryPage: NextPage<HistoryProps> = ({ orders }) => {
  const rows = orders.map((order, i) => ({
    item: i + 1,
    id: order._id,
    paid: order.isPaid,
    fullname: `${order.shippingAddress.name} ${order.shippingAddress.surnames}`,
  }));

  return (
    <ShopLayout title='Historial de ordenes' description='Historial de ordenes del cliente' imageFullUrl=''>
      <Typography variant='h1' component='h1'>
        Hitorial de Ordenes
      </Typography>

      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={colums} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?p=orders/history',
        permanent: false,
      },
    };
  }

  const orders = await orderController.getOrdersByUser(session.user._id);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
