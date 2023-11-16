import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
  baseStyle: {
    boxShadow: '0px 1.5px 2px 0px rgba(16, 24, 40, 0.10)',
    bg: 'white',
    rounded: '0.5rem',
    '.chakra-card__header': {
      '--card-padding': '1.5rem 1.5rem 1.25rem',
    },
    '.chakra-card__body': {
      '--card-padding': '0 1.5rem 1.5rem',
    },
  },
});
