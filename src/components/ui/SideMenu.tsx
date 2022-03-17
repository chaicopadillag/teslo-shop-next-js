import { useContext, useState } from 'react';
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { UIContext } from '../../contexts';

export const SideMenu = () => {
  const { push } = useRouter();
  const [keyword, setKeyword] = useState('');

  const { isOpenSidebar, toggleSidebar } = useContext(UIContext);

  const onSearch = () => {
    if (keyword.length <= 0) return;

    onNavTo(`/search/${keyword}`);
  };

  const onNavTo = (url: string) => {
    toggleSidebar();
    push(url);
  };

  return (
    <Drawer open={isOpenSidebar} anchor='right' sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }} onClose={toggleSidebar}>
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              type='text'
              placeholder='Buscar...'
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onSearch();
                }
              }}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton onClick={onSearch}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Perfil'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={'Mis Ordenes'} />
          </ListItem>

          <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={() => onNavTo('/men')}>
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Hombres'} />
          </ListItem>

          <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={() => onNavTo('/women')}>
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Mujeres'} />
          </ListItem>

          <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={() => onNavTo('/kid')}>
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={'Niños'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <VpnKeyOutlined />
            </ListItemIcon>
            <ListItemText primary={'Ingresar'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={'Salir'} />
          </ListItem>

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          <ListItem button>
            <ListItemIcon>
              <CategoryOutlined />
            </ListItemIcon>
            <ListItemText primary={'Productos'} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={'Ordenes'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary={'Usuarios'} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
