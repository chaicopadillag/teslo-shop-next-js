import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { ISize } from '../../interfaces';

type SizeProductProp = {
  sizes: ISize[];
  selectedSize?: ISize;
};
export const SizeProductSelector: FC<SizeProductProp> = ({ selectedSize, sizes }) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button key={size} size='small' color={selectedSize === size ? 'primary' : 'info'}>
          {size}
        </Button>
      ))}
    </Box>
  );
};
