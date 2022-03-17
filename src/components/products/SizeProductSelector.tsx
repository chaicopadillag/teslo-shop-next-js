import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { ISize } from '../../interfaces';

type SizeProductProp = {
  sizes: ISize[];
  selectedSize?: ISize;
  onChangeSize: (size: ISize) => void;
};
export const SizeProductSelector: FC<SizeProductProp> = ({ selectedSize, sizes, onChangeSize }) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button key={size} size='small' color={selectedSize === size ? 'primary' : 'info'} onClick={() => onChangeSize(size)}>
          {size}
        </Button>
      ))}
    </Box>
  );
};
