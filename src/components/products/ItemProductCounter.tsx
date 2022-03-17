import { FC, useEffect, useState } from 'react';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

type ItemCounterProps = {
  value: number;
  maxValue: number;
  onChange: (value: number) => void;
};

export const ItemProductCounter: FC<ItemCounterProps> = ({ value, maxValue, onChange }) => {
  const onChangeValue = (val: number) => {
    const quatity = Math.max(value + val, 0);

    if (quatity <= 0) return;
    if (quatity > maxValue) return;

    onChange(quatity);
  };

  return (
    <Box display='flex' alignItems='center'>
      <IconButton onClick={() => onChangeValue(-1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>{value}</Typography>
      <IconButton onClick={() => onChangeValue(+1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
