import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { FC } from 'react';

type ItemCounterProps = {};

export const ItemProductCounter: FC<ItemCounterProps> = ({}) => {
  return (
    <Box display='flex' alignItems='center'>
      <IconButton color='error'>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>1</Typography>
      <IconButton color='secondary'>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
