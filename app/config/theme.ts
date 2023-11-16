'use client';

import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import Card from './components/Card';
import Badge from './components/Badge';
import IconButton from './components/IconButton';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: {
    Card,
    Badge,
    IconButton,
  },
});

export default theme;
