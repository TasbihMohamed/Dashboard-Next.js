import {
  // eslint-disable-next-line no-restricted-imports
  Badge as BaseBadge,
  // eslint-disable-next-line no-restricted-imports
  BadgeProps as BaseBadgeProps,
  useStyleConfig,
} from '@chakra-ui/react';
import { FC } from 'react';

export interface BadgeProps extends Omit<BaseBadgeProps, 'variant' | 'size'> {
  variant?: 'outlined' | 'solid';
  size?: 'sm';
}

const Badge: FC<BadgeProps> = ({ variant, size, ...props }) => {
  const styleConfig = useStyleConfig('Badge', {
    variant,
    size,
  });

  return <BaseBadge __css={styleConfig} {...props} />;
};

export default Badge;
