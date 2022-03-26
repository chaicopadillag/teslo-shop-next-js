import { Chip, CircularProgress, Grid } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DashboardLayout } from '../../../components/layouts';
import useSWR from 'swr';
import { IOrder } from '../../../interfaces';
import { currency } from '../../../helpers';
import { ConfirmationNumberOutlined } from '@mui/icons-material';

const columns: GridColDef[] = [
  { field: 'item', headerName: 'N°', width: 100 },
  { field: 'fullname', headerName: 'Nombre completo', width: 300 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'address', headerName: 'Dirección', width: 200 },
  { field: 'phone', headerName: 'Teléfono', width: 200 },
  { field: 'inStock', headerName: 'N° Productos', width: 200 },
  { field: 'total', headerName: 'Monto Total', width: 200 },
  { field: 'createdAt', headerName: 'Fecha de pedido', width: 200 },
  {
    field: 'status',
    headerName: 'Estado',
    width: 200,
    renderCell: ({ row }) => {
      return row.status ? <Chip variant='outlined' label='Pagada' color='success' /> : <Chip variant='outlined' label='Pendiente' color='error' />;
    },
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 200,
    renderCell: ({ row }) => {
      return (
        <a href={`/dashboard/order/${row.id}`} target='_blank' rel='noreferrer'>
          Ver orden
        </a>
      );
    },
  },
];

const OrderPage = () => {
  const { data, error } = useSWR<IOrder[]>('/api/dashboard/order');

  if (!data) {
    return (
      <DashboardLayout title='Ordenes' subTitle='Mantenimiento de ordenes' icon={<ConfirmationNumberOutlined />}>
        <Grid container className='fadeIn'>
          <Grid container justifyContent='center'>
            <CircularProgress />
          </Grid>
        </Grid>
      </DashboardLayout>
    );
  }
  const rows = data.map((order, index) => ({
    id: order._id,
    item: index + 1,
    fullname: `${order.shippingAddress.name} ${order.shippingAddress.surnames}`,
    email: order.shippingAddress.email,
    address: order.shippingAddress.address,
    phone: order.shippingAddress.telephone,
    inStock: order.numberOfItems,
    total: currency.format(order.total),
    status: order.isPaid,
    createdAt: order.createdAt,
  }));

  return (
    <DashboardLayout title={'Ordenes'} subTitle={'Listado de todas las ordenes'} icon={<ConfirmationNumberOutlined />}>
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default OrderPage;
