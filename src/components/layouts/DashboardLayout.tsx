import { FC } from 'react';
import Head from 'next/head';
import { Box, Typography } from '@mui/material';
import { AdminNavbar } from '../dashboard';
import { SideMenu } from '../ui';

type DashboardLayoutProps = {
  title: string;
  subTitle: string;
  icon?: JSX.Element;
};

export const DashboardLayout: FC<DashboardLayoutProps> = ({ title, children, subTitle, icon }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <nav>
        <AdminNavbar />
      </nav>
      <SideMenu />
      <main style={{ margin: '80px auto', maxWidth: '1440px', padding: '0px 30px' }}>
        <Box display='flex' flexDirection='column'>
          <Typography variant='h1' component='h1'>
            {icon} {title}
          </Typography>
          <Typography variant='h2' sx={{ mb: 1 }}>
            {subTitle}
          </Typography>
        </Box>
        <Box className='fadeIn'>{children}</Box>
      </main>
    </>
  );
};
