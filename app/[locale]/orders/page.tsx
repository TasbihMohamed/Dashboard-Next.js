'use client';
import OrdersList from '@/app/components/Common/OrdersList/OrdersList';
import TimeSwitcher from '@/app/components/Common/TimeSwitcher/TimeSwitcher';

import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import BreadcrumbNavigation from '@/app/components/Shared/BreadcrumbNavigation';
import { GoFilter } from 'react-icons/go';
import { statusColorFilters } from '@/app/constant/StatusColors';
import { TranslationKey } from '@/app/types/withTranslation';
import { useState } from 'react';
import { COLORS, TIMELINES } from '@/app/constant/UserDashboard';
import { PiExportBold } from 'react-icons/pi';
import { IoMdAdd } from 'react-icons/io';
import { useRouter } from 'next/navigation';

interface Props {
  params: { locale: string };
  searchParams: {};
}

const Orders = (_: Props) => {
  const t = useTranslations('HomePage');
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState('All');
  const [timestampFilter, setTimestampFilter] = useState(
    Number.MAX_SAFE_INTEGER,
  );

  const filterByStatus = (status: string) => {
    return () => {
      setStatusFilter(status);
    };
  };

  return (
    <Stack
      gap={3}
      padding="24px 24px"
      pl="32px"
      height="100hv"
      backgroundColor="E0E2E7"
      overflow="hidden"
    >
      <BreadcrumbNavigation
        title="Orders"
        items={[
          { label: t('Dashboard'), link: '/' },
          { label: t('Order List'), link: '#' },
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
      <TimeSwitcher
        getTime={timeline => {
          setTimestampFilter(
            TIMELINES.find(({ value }) => value === timeline)?.timestamp ??
              Number.MAX_SAFE_INTEGER,
          );
        }}
        customButtons={[
          <Menu autoSelect={false} key="FilterOrderButton">
            <MenuButton as={Button} leftIcon={<GoFilter />}>
              <Text ml={1} fontWeight="semibold" fontSize={14}>
                {t('Filters')}
              </Text>
            </MenuButton>
            <Portal>
              <MenuList>
                {['All', ...statusColorFilters].map(status => (
                  <MenuItem
                    key={status}
                    onClick={filterByStatus(status)}
                    bg={statusFilter === status ? '#EDF2F7' : ''}
                  >
                    {t(status as TranslationKey<'HomePage'>)}
                  </MenuItem>
                ))}
              </MenuList>
            </Portal>
          </Menu>,
        ]}
      />
      <OrdersList
        statusFilter={statusFilter}
        timestampFilter={timestampFilter}
      />
    </Stack>
  );
};

export default Orders;
