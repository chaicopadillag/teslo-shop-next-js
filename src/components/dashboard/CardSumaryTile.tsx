import { FC } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';

type CardSumaryTileProps = {
  title: number;
  subTitle: string;
  icon: JSX.Element;
};

export const CardSumaryTile: FC<CardSumaryTileProps> = ({ title, subTitle, icon }) => {
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card sx={{ maxWidth: 345, textAlign: 'center', backgroundColor: '#ddd' }}>
        <CardContent>
          <Typography variant='h3' component='h3' color='ThreeDDarkShadow'>
            {title} {icon}
          </Typography>
          <Typography variant='h6' color='text.secondary'>
            {subTitle}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
