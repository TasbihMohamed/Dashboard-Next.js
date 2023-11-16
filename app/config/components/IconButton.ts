import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
  baseStyle: {
    display: 'grid',
    placeItems: 'center',
    position: 'relative',
    flexShrink: 0,
    '&::after': {
      content: '" "',
      position: 'absolute',
      inset: '4px',
      zIndex: 0,
    },
    '& svg': {
      position: 'relative',
      zIndex: 1,
      fill: '#667085',
    },
    '&:hover': {
      bg: '#F0F1F3',
    },
  },
  sizes: {
    xs: {
      width: '1.5rem',
      height: '1.5rem',
    },
    sm: {
      width: '2.5rem',
      height: '2.5rem',
    },
    md: {
      width: '3.25rem',
      height: '3.25rem',
    },
  },
  variants: {
    ghost: {
      rounded: '5px',
    },
    circle: {
      '&, &::after': {
        rounded: '100%',
      },
      '&::after': {
        bg: '#E0E2E7',
      },
      bg: '#F0F1F3',
    },
    rectangle: {
      '&, &::after': {
        rounded: '5px',
      },
      '&::after': {
        bg: '#E0E2E7',
      },
      bg: '#F0F1F3',
    },
  },
  defaultProps: {
    size: 'sm',
    variant: 'ghost',
  },
});
