'use client';
import ProductList from '@/app/components/Common/ProductsList/ProductList';
import { COLORS } from '@/app/constant/UserDashboard';
import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiExport, BiImport, BiSearch } from 'react-icons/bi';
import { useTranslations } from 'next-intl';
import BreadcrumbNavigation from '@/app/components/Shared/BreadcrumbNavigation';
import { useRouter } from 'next/navigation';
import { IoMdAdd } from 'react-icons/io';
import { PiExportBold } from 'react-icons/pi';

interface Props {
  params: { locale: string };
  searchParams: {};
}

const Product = (_: Props) => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const [searchKeyWord, setSearchKeyWord] = useState<string>('');
  const t = useTranslations('HomePage');

  return (
    <Stack
      gap={3}
      padding="24px 24px"
      pl="32px"
      height="100hv"
      backgroundColor="E0E2E7"
      overflow="hidden"
    >
      <Flex
        align="center"
        justifyContent={{ base: 'flex-start', md: 'space-between' }}
        gap={{ base: 10, md: 8 }}
      >
        <BreadcrumbNavigation
          title={t('Products')}
          items={[
            { label: t('Dashboard'), link: '/' },
            { label: t('Product List'), link: '#' },
          ]}
          actions={[
            {
              title: 'Export',
              leftIcon: <PiExportBold />,
              bg: COLORS._primaryColor100,
              color: COLORS._primaryColor,
              _hover: {
                bg: COLORS._primaryColor100,
                color: COLORS._primaryColor,
              },
            },
            {
              title: 'Add Product',
              leftIcon: <IoMdAdd />,
              bg: COLORS._primaryColor,
              color: 'white',
              _hover: {
                bg: COLORS._primaryColor100,
                color: COLORS._primaryColor,
              },
              onClick: () => router.push('/products/add'),
            },
          ]}
        />

        <Flex flexDirection="row" gap={2} display={{ md: 'none' }}>
          <Button
            ml={1}
            backgroundColor="#fff"
            aria-label="Select Dates"
            display="flex"
            alignItems="center"
          >
            <BiImport color={colorMode === 'light' ? '' : COLORS._grayOne} />
            <Text
              ml={1}
              fontWeight="semibold"
              fontSize="14px"
              color={colorMode === 'light' ? '' : COLORS._grayOne}
            >
              {t('Import')}
            </Text>
          </Button>
          <Button
            ml={1}
            backgroundColor={COLORS._primaryColor}
            aria-label="Select Dates"
            display="flex"
            alignItems="center"
          >
            <BiExport color="#fff" />
            <Text ml={1} fontWeight="semibold" fontSize="14px" color="#fff">
              {t('Export')}
            </Text>
          </Button>
        </Flex>
      </Flex>
      <Box w={{ base: '90vw', md: '100%' }} position="relative">
        <Input
          borderRadius={8}
          type="text"
          placeholder="Search product. . ."
          backgroundColor={colorMode === 'light' ? '#fff' : '#2c313d'}
          onChange={e => setSearchKeyWord(e.target.value)}
          value={searchKeyWord}
          paddingLeft={8}
        />
        <Box left={3} top={3} position="absolute">
          <BiSearch
            fontSize={18}
            fill={colorMode === 'light' ? 'black.500' : COLORS._grayOne}
          />
        </Box>
      </Box>
      <ProductList searchKeyWord={searchKeyWord} />;
    </Stack>
  );
};

export default Product;
