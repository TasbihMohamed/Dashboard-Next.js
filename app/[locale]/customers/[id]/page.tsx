'use client';
import CustomerDetails from '@/app/components/Common/CustomerDetails/CustomerDetails';
import { COLORS } from '@/app/constant/UserDashboard';
import { Stack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { PiExportBold } from 'react-icons/pi';
import { IoMdAdd } from 'react-icons/io';
import BreadcrumbNavigation from '@/app/components/Shared/BreadcrumbNavigation';

interface Props {
  params: { id: string };
  searchParams: {};
}

const Customers = ({ params }: Props) => {
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
      <BreadcrumbNavigation
        title="Customer"
        items={[
          { label: t('Dashboard'), link: '/' },
          { label: t('Customer List'), link: '/customers' },
          { label: t('Customer Details'), link: '#' },
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
      <CustomerDetails id={params.id} />
    </Stack>
  );
};

export default Customers;
