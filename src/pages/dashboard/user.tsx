import { PeopleOutlined } from '@mui/icons-material';
import { CircularProgress, Grid, Select, MenuItem } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import tesloApi from '../../services/tesloApi';
import { DashboardLayout } from '../../components/layouts';
import useSWR from 'swr';
import { IUser } from '../../interfaces';
import { useEffect, useState } from 'react';

const UserPage = () => {
  const { data, error } = useSWR<IUser[]>('/api/dashboard/user');
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!data) {
    return (
      <DashboardLayout title='Usuarios' subTitle='Mantenimiento de usuarios' icon={<PeopleOutlined />}>
        <Grid container className='fadeIn'>
          <Grid container justifyContent='center'>
            <CircularProgress />
          </Grid>
        </Grid>
      </DashboardLayout>
    );
  }

  const handleUpdateRol = async (user: string, role: string) => {
    const copyUsers = [...users];
    try {
      setUsers((urs) => urs.map((u) => (u._id === user ? { ...u, role } : u)));
      await tesloApi.put(`/dashboard/user`, { role, id: user });
    } catch (error) {
      setUsers(copyUsers);
      console.error(error);
    }
  };

  const colums: GridColDef[] = [
    { field: 'item', headerName: 'N°', width: 100 },
    { field: 'fullname', headerName: 'Nombre completo', width: 300 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'role',
      headerName: 'Rol',
      width: 200,
      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Select value={row.role} label='Rol' sx={{ width: '300px' }} onChange={({ target }) => handleUpdateRol(row.id, target.value)}>
            <MenuItem value='ADMIN'>Administrador</MenuItem>
            <MenuItem value='CLIENT'>Cliente</MenuItem>
            <MenuItem value='SEO'>SEO</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = users.map((user, i) => ({
    id: user._id,
    item: i + 1,
    fullname: user.name,
    email: user.email,
    role: user.role,
  }));

  return (
    <DashboardLayout title='Usuarios' subTitle='Mantenimiento de usuarios' icon={<PeopleOutlined />}>
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={colums} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default UserPage;
