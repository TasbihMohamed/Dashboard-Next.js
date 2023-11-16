'use client';
import { Box, Flex, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiPencil, BiTrash } from 'react-icons/bi';
import Table from '@/app/components/Shared/Table';
import IconButton from '@/app/components/Shared/IconButton';
import { AiOutlineEye } from 'react-icons/ai';
import { useFormatter } from 'next-intl';

const ITEMS_PER_PAGE = 7;

interface Props {
  params: { locale: string };
  searchParams: {};
}

const rowValues = {
  name: 'Test',
  phone: '078 5054 8877',
  orders: 124,
  balance: 121,
  status: 'N/A',
  date: '29 Dec 2022',
  actions: (
    <Flex>
      <IconButton
        backgroundColor="transparent"
        aria-label="edit"
        icon={<BiTrash />}
        size="xs"
      />
      <IconButton
        backgroundColor="transparent"
        aria-label="edit"
        icon={<BiPencil />}
        size="xs"
      />
      <IconButton
        backgroundColor="transparent"
        aria-label="preview"
        icon={<AiOutlineEye />}
        size="xs"
      />
    </Flex>
  ),
};

const data = Array.from({ length: 100 }).map((_, index) => ({
  id: index,
  ...rowValues,
  name: `Test ${index + 1}`,
  balance: rowValues.balance * (Math.random() * 10),
}));

const TablePage = (_: Props) => {
  const format = useFormatter();
  const [, setSortBy] = useState({ value: 'name', order: 'asc' });
  const [page, setPage] = useState(1);

  return (
    <Stack
      gap={3}
      padding="24px 24px"
      pl="32px"
      height="100hv"
      backgroundColor="E0E2E7"
      w="max-content"
    >
      <Table
        totalItems={data.length}
        itemsPerPage={ITEMS_PER_PAGE}
        columnWidths={[
          '261px',
          '11rem',
          '156px',
          '156px',
          '100px',
          '138px',
          '120px',
        ]}
        onSortChange={setSortBy}
        onPageChange={setPage}
      >
        <Table.Head
          columns={[
            { name: 'Customer Name', value: 'name', isSortable: true },
            'Phone',
            { name: 'Orders', value: 'orders', isSortable: true },
            { name: 'Balance', value: 'balance', isSortable: true },
            { name: 'Status', value: 'status', isSortable: true },
            { name: 'Created', value: 'created_at', isSortable: false },
            'Action',
          ]}
        />
        <Table.Body>
          {data.slice((page - 1) * ITEMS_PER_PAGE).map((item, index) => (
            <Table.Row
              key={item.id}
              index={index}
              columns={[
                <Flex key="customer" gap="0.5rem">
                  <Box
                    width={{ base: 5, md: '44px' }}
                    height={{ base: 5, md: '44px' }}
                    borderRadius={8}
                    backgroundColor="#E0E2E7"
                    rounded="100%"
                  ></Box>
                  <SimpleGrid alignItems="center">
                    <Text fontSize={{ base: 8, md: 14 }}>{item.name}</Text>
                  </SimpleGrid>
                </Flex>,
                <Text
                  key="phone-number"
                  fontFamily="Inter"
                  fontSize="0.875rem"
                  letterSpacing="0.07px"
                >
                  {item.phone}
                </Text>,
                item.orders,
                format.number(item.balance, {
                  style: 'currency',
                  currency: 'USD',
                }),
                item.status,
                <Text
                  key="date"
                  fontFamily="Inter"
                  fontSize="0.875rem"
                  fontWeight={500}
                  lineHeight={1.42857}
                  letterSpacing="0.07px"
                >
                  {item.date}
                </Text>,
                item.actions,
              ]}
            />
          ))}
        </Table.Body>
      </Table>
    </Stack>
  );
};

export default TablePage;
