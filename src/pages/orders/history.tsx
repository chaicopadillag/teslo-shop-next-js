import NextLink from 'next/link';
import { Typography, Grid, Chip, Link, Button } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts';
import { VisibilityOutlined } from '@mui/icons-material';

const colums: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
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

const rows = [
  { id: 1, paid: false, fullname: 'Juan Perez' },
  { id: 2, paid: true, fullname: 'Allan Baumbach' },
  { id: 3, paid: false, fullname: 'Ashley Buckridge' },
  { id: 4, paid: true, fullname: 'Bryanna Schulist' },
  { id: 5, paid: false, fullname: 'Kelton Kirlin' },
  { id: 6, paid: true, fullname: 'Kenny Schowalter' },
];

const HistoryPage = () => {
  return (
    <ShopLayout title='Historial de ordenes' description='Historial de ordenes del cliente' imageFullUrl=''>
      <Typography variant='h1' component='h1'>
        Hitorial de Ordenes
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={colums} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
