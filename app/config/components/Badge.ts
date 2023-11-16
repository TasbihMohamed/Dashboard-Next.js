import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
  baseStyle: {
    height: 'fit-content',
    textTransform: 'normal',
    color: 'white',
    rounded: '5px',
    fontFamily: 'Inter',
  },
  sizes: {
    sm: {
      padding: '0.25rem 0.75rem',
      fontSize: '0.875rem',
      lineHeight: 1.42857,
      fontWeight: 600,
    },
  },
  variants: {
    outlined: {
      border: '1px solid #667085',
      bg: 'transparent',
      color: '#667085',
    },
    solid: {},
  },
  defaultProps: {
    size: 'sm',
    variant: 'solid',
  },
});
