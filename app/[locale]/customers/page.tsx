'use client';
import CustomerList from '@/app/components/Common/CustomerList/CustomerList';
import { COLORS } from '@/app/constant/UserDashboard';
import {
  Box,
  Flex,
  Input,
  Stack,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { PiExportBold } from 'react-icons/pi';
import { IoMdAdd } from 'react-icons/io';
import BreadcrumbNavigation from '@/app/components/Shared/BreadcrumbNavigation';

const filters = ['High Orders', 'Low Orders', 'New'];

interface CustomersProps {
  params: { locale: string };
  searchParams: {};
}

const Customers = (_: CustomersProps) => {
  const { colorMode } = useColorMode();
  const [searchKeyWord, setSearchKeyWord] = useState<string>('');
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const t = useTranslations('HomePage');

  return (
    <Stack
      gap={3}
      padding="24px 24px"
      pl="32px"
      height={'100hv'}
      backgroundColor={'E0E2E7'}
      overflow={'hidden'}
    >
      <Flex
        align={'center'}
        justify={isMobile ? 'flex-start' : 'space-between'}
        gap={isMobile ? 10 : 8}
      >
        <BreadcrumbNavigation
          title="Customer"
          items={[
            { label: t('Dashboard'), link: '/' },
            { label: t('Customer List'), link: '#' },
          ]}
          actions={[
            {
              title: 'Export',
              leftIcon: <PiExportBold />,
              bg: COLORS._primaryColor100,
              color: COLORS._primaryColor,
              _hover: {
                bg: COLORS._primaryColor50,
                color: COLORS._primaryColor100,
              },
            },
            {
              title: 'Add Customer',
              leftIcon: <IoMdAdd />,
              bg: COLORS._primaryColor,
              color: 'white',
              _hover: {
                bg: COLORS._primaryColor100,
                color: COLORS._primaryColor,
              },
              onClick: () => {},
            },
          ]}
        />
      </Flex>
      <Box w="min(20rem, 100%)" position={'relative'}>
        <Input
          borderRadius={8}
          type="text"
          placeholder="Search customer. . ."
          backgroundColor={colorMode === 'light' ? '#fff' : '#2c313d'}
          onChange={e => setSearchKeyWord(e.target.value)}
          value={searchKeyWord}
          paddingLeft={8}
        />
        <Box left={3} top={3} position={'absolute'}>
          <BiSearch
            fontSize={18}
            fill={colorMode === 'light' ? 'black.500' : COLORS._grayOne}
          />
        </Box>
      </Box>
      <CustomerList searchKeyWord={searchKeyWord} />
    </Stack>
  );
};

export default Customers;
