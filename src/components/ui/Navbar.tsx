import { useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { UIContext } from '../../contexts';

export const Navbar = () => {
  const { toggleSidebar } = useContext(UIContext);
  const { pathname } = useRouter();

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
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NextLink href='/men' passHref>
            <Link>
              <Button color={pathname === '/men' ? 'primary' : 'info'}>Hombres</Button>
            </Link>
          </NextLink>
          <NextLink href='/women' passHref>
            <Link>
              <Button color={pathname === '/women' ? 'primary' : 'info'}>Mujeres</Button>
            </Link>
          </NextLink>
          <NextLink href='/kid' passHref>
            <Link>
              <Button color={pathname === '/kid' ? 'primary' : 'info'}>Niños</Button>
            </Link>
          </NextLink>
        </Box>
        <Box flex='1' />
        <IconButton>
          <SearchOutlined />
        </IconButton>
        <NextLink href='/cart' passHref>
          <Link>
            <Button>
              <Badge badgeContent={2} color='secondary'>
                <ShoppingCartOutlined />
              </Badge>
            </Button>
          </Link>
        </NextLink>
        <Button onClick={toggleSidebar}>
          <MenuIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
};
