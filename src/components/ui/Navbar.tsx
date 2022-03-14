import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

export const Navbar = () => {
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
          <NextLink href='/category/men' passHref>
            <Link>
              <Button>Hombres</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/woman' passHref>
            <Link>
              <Button>Mujeres</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/kid' passHref>
            <Link>
              <Button>Niños</Button>
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
        <Button>
          <MenuIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
};
