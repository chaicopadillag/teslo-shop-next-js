import NextLink from 'next/link';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Button, Link, Typography } from '@mui/material';

export const EmptyCart = () => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)' sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
      <Box display='flex' flexWrap='wrap' flexDirection='row' justifyContent='center' alignItems='center'>
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Typography variant='h2' component='h6'>
          Su carrito está vació
        </Typography>
        <Box display='flex' width='100%' justifyContent='center' alignItems='center' marginTop={4}>
          <NextLink href='/' passHref>
            <Link>
              <Button color='primary' size='large' variant='outlined'>
                Agregar productos
              </Button>
            </Link>
          </NextLink>
        </Box>
      </Box>
    </Box>
  );
};
