import {
  // eslint-disable-next-line no-restricted-imports
  IconButton as BaseIconButton,
  // eslint-disable-next-line no-restricted-imports
  IconButtonProps as BaseIconButtonProps,
  useStyleConfig,
} from '@chakra-ui/react';
import { FC } from 'react';

export interface IconButtonProps
  extends Omit<BaseIconButtonProps, 'variant' | 'size'> {
  variant?: 'circle' | 'rectangle' | 'ghost';
  size?: 'xs' | 'sm' | 'md';
}

const IconButton: FC<IconButtonProps> = ({ variant, size, ...props }) => {
  const styleConfig = useStyleConfig('IconButton', {
    variant,
    size,
  });

  return <BaseIconButton __css={{ ...styleConfig }} {...props} />;
};

export default IconButton;
