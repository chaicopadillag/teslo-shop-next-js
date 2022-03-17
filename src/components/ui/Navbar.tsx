import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { CloseOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { UIContext } from '../../contexts';

export const Navbar = () => {
  const [keyword, setKeyword] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { toggleSidebar } = useContext(UIContext);
  const { pathname, push } = useRouter();

  const onSearch = () => {
    if (keyword.length <= 0) return;
    push(`/search/${keyword}`);
  };

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
        <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}>
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

        {/* FIXME: Desktop */}

        {isSearchVisible ? (
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
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <CloseOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            sx={{
              display: { xs: 'none', sm: 'flex' },
            }}
            onClick={() => setIsSearchVisible(true)}
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* TODO: Movil */}
        <IconButton
          sx={{
            display: { xs: 'flex', sm: 'none' },
          }}
          onClick={toggleSidebar}
        >
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
