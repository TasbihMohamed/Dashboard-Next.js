'use client';
import { Box, Flex, SimpleGrid, Text, useColorMode } from '@chakra-ui/react';
import { useFormatter } from 'next-intl';
import { useEffect, useState } from 'react';
import { Customer } from '@/app/types/UserDashboard';
import { useRouter } from 'next/navigation';
import Table from '@/app/components/Shared/Table';
import IconButton from '@/app/components/Shared/IconButton';
import { BiPencil } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import Badge from '@/app/components/Shared/Badge';
import { COLORS } from '@/app/constant/UserDashboard';

const headCells = [
  'Customer Name',
  'Phone',
  'Orders',
  'Balance',
  'Status',
  'Created',
  'Action',
];

const StatusColors: Record<string, { background: string; color: string }> = {
  Blocked: {
    background: '#FEEDEC',
    color: '#F81E6E',
  },
  Active: {
    background: '#E7F4EE',
    color: '#0D894F',
  },
};

interface CustomerListProps {
  searchKeyWord: string;
}

const CustomerList = ({ searchKeyWord }: CustomerListProps) => {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const format = useFormatter();
  const { colorMode } = useColorMode();

  useEffect(() => {
    setLoading(true);
    fetch('/api/customers', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          '_shoptak-user-session',
        )}`,
      },
    })
      .then(resp => resp.json())
      .then((customers: Customer[]) => setCustomers(customers))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Text>loading...</Text>;

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchKeyWord.toLowerCase()),
  );

  return (
    <>
      <Table
        backgroundColor={
          colorMode === 'dark' ? COLORS._darkBackground : 'white'
        }
        totalItems={filteredCustomers.length}
        columnWidths={[
          '261px',
          '148px',
          '148px',
          '156px',
          '156px',
          '140px',
          '170px',
        ]}
        itemsPerPage={Math.min(10, filteredCustomers.length)}
        onPageChange={() => {}}
        onSortChange={() => {}}
      >
        <Table.Head
          backgroundColor={
            colorMode === 'dark' ? COLORS._darkBackground : 'white'
          }
          columns={headCells}
        />
        <Table.Body>
          {filteredCustomers.map((customer, index) => (
            <Table.Row
              key={customer.id}
              index={index}
              columns={[
                <Flex gap="0.5rem" key="1">
                  <Box
                    width={{ base: 5, md: '44px' }}
                    height={{ base: 5, md: '44px' }}
                    borderRadius={8}
                    backgroundColor="#E0E2E7"
                    rounded="100%"
                    flexShrink={0}
                  />
                  <SimpleGrid alignItems="center">
                    <Text fontSize={{ base: 8, md: 14 }}>{customer.name}</Text>
                    <Text
                      fontSize="0.75rem"
                      fontWeight={400}
                      lineHeight={1.5}
                      color="#667085"
                    >
                      {customer.email}
                    </Text>
                  </SimpleGrid>
                </Flex>,
                <Text
                  textAlign={'center'}
                  fontSize={{ base: 8, md: 14 }}
                  key="2"
                >
                  {customer?.phone}
                </Text>,
                <Text
                  textAlign={'center'}
                  fontSize={{ base: 8, md: 14 }}
                  key="3"
                >
                  {customer?.orders.length}
                </Text>,
                <Text
                  textAlign={'center'}
                  fontSize={{ base: 8, md: 14 }}
                  key="4"
                >
                  {customer?.balance}
                </Text>,
                <Badge
                  height="fit-content"
                  fontSize={{ base: 8, md: 14 }}
                  borderRadius="20px"
                  textAlign={'center'}
                  backgroundColor={StatusColors[customer.status].background}
                  color={StatusColors[customer.status].color}
                  key="5"
                >
                  {customer?.status}
                </Badge>,
                <Text
                  textAlign={'center'}
                  height="fit-content"
                  fontSize={{ base: 8, md: 14 }}
                  borderRadius="20px"
                  key="6"
                >
                  {format.relativeTime(customer?.lastOrderDate)}
                </Text>,
                <>
                  <IconButton
                    backgroundColor="transparent"
                    aria-label="edit"
                    icon={<BiPencil />}
                  />
                  <IconButton
                    backgroundColor="transparent"
                    aria-label="preview"
                    icon={<AiOutlineEye />}
                    onClick={() => router.push(`/customers/${customer.id}`)}
                  />
                </>,
              ]}
            />
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default CustomerList;
