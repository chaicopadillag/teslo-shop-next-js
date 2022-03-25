import { useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { UIContext } from '../../contexts';

export const AdminNavbar = () => {
  const { toggleSidebar } = useContext(UIContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref>
          <Link display='flex' alignItems='center'>
            <Typography variant='h6'>Teslo | </Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
            <Typography></Typography>
          </Link>
        </NextLink>
        <Box flex='1' />
        <Button onClick={toggleSidebar}>
          <MenuIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
};
