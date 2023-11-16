import {
  // eslint-disable-next-line no-restricted-imports
  Card as BaseCard,
  // eslint-disable-next-line no-restricted-imports
  CardProps as BaseCardProps,
  useStyleConfig,
} from '@chakra-ui/react';
import { FC } from 'react';

export interface CardProps extends Omit<BaseCardProps, 'variant' | 'size'> {
  variant?: string;
  size?: string;
}

const Card: FC<CardProps> = ({ variant, size, ...props }) => {
  const styleConfig = useStyleConfig('Card', {
    variant,
    size,
  });

  return <BaseCard __css={styleConfig} {...props} />;
};

export default Card;
