import useSWR from 'swr';
import {
  DashboardOutlined,
  CreditScoreOutlined,
  AttachMoneyOutlined,
  CreditCardOffOutlined,
  GroupOutlined,
  CategoryOutlined,
  CancelPresentationOutlined,
  ProductionQuantityLimitsOutlined,
  AccessTimeOutlined,
} from '@mui/icons-material';
import { CircularProgress, Grid } from '@mui/material';
import { CardSumaryTile } from '../../components/dashboard';
import { DashboardLayout } from '../../components/layouts';
import { IDashboardResponse } from '../../interfaces/dashboard';
import { useEffect, useState } from 'react';

const DashboardPage = () => {
  const [refreshIn, setRefreshIn] = useState(30);
  const { data, error } = useSWR<IDashboardResponse>(`/api/dashboard`, {
    refreshInterval: 3 * 10000,
  });

  useEffect(() => {
    const interval = setInterval(() => setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30)), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout title='Dashboard' subTitle='Estadisticas generales' icon={<DashboardOutlined />}>
      {!data ? (
        <Grid container spacing={2} justifyContent='center'>
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <CardSumaryTile title={data.numberOrders} subTitle='Ordenes totales' icon={<CreditScoreOutlined color='secondary' fontSize='large' />} />
          <CardSumaryTile title={data.paidOrders} subTitle='Ordenes pagados' icon={<AttachMoneyOutlined color='success' fontSize='large' />} />
          <CardSumaryTile title={data.notPaidOrders} subTitle='Ordenes pendientes' icon={<CreditCardOffOutlined color='error' fontSize='large' />} />
          <CardSumaryTile title={data.numberClients} subTitle='Clientes' icon={<GroupOutlined color='primary' fontSize='large' />} />
          <CardSumaryTile title={data.numberProducts} subTitle='Productos' icon={<CategoryOutlined color='warning' fontSize='large' />} />
          <CardSumaryTile title={data.productsNotInStock} subTitle='Sin stock' icon={<CancelPresentationOutlined color='error' fontSize='large' />} />
          <CardSumaryTile title={data.productsLowInStock} subTitle='Bajo inventario' icon={<ProductionQuantityLimitsOutlined color='warning' fontSize='large' />} />
          <CardSumaryTile title={refreshIn} subTitle='Actualización en:' icon={<AccessTimeOutlined color='secondary' fontSize='large' />} />
        </Grid>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;
