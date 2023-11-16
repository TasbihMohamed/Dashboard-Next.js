'use client';
import { useFormatter, useTranslations } from 'next-intl';
import { noop } from '@chakra-ui/utils';
import Table from '@/app/components/Shared/Table';
import { Order } from '@/app/types/UserDashboard';
import { StatusColors } from '@/app/constant/StatusColors';
import Badge from '@/app/components/Shared/Badge';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { COLORS } from '@/app/constant/UserDashboard';
import { addLeadingZeros } from '@/app/utils/add-leading-zeros';
import { Link } from '@chakra-ui/next-js';

const headCells = ['Order ID', 'Product', 'Total', 'Status', 'Date'];

interface TransactionHistoryListProps {
  transactions: Order[];
}

function TransactionHistoryList({ transactions }: TransactionHistoryListProps) {
  const t = useTranslations('HomePage');
  const format = useFormatter();

  return (
    <Table
      totalItems={transactions.length}
      columnWidths={['109px', '290px', '138px', '145px', '160px']}
      itemsPerPage={Math.min(10, transactions.length)}
      onSortChange={noop}
      onPageChange={noop}
      boxShadow="none"
      mt="18px"
      w="100%"
    >
      <Table.Head columns={headCells} />
      <Table.Body>
        {transactions.map((transaction, index) => (
          <Table.Row
            key={transaction.id}
            index={index}
            columns={[
              <Link
                href={`/orders/${transaction.id}`}
                textDecoration="none"
                color={COLORS._primaryColor}
                fontSize={14}
                fontWeight={600}
                key={index}
              >
                #
                {addLeadingZeros(
                  index + 1,
                  Math.max(7, Math.floor(Math.log10(transactions.length)) + 1),
                )}
              </Link>,
              <Flex gap="0.5rem" key="2">
                <Box
                  width="2.75rem"
                  height="2.75rem"
                  bg="#E0E2E7"
                  rounded={10}
                />
                <SimpleGrid gap="0.25rem" alignContent="center">
                  {transaction.products.length && (
                    <Text
                      fontSize="0.875rem"
                      fontWeight={500}
                      lineHeight={1.42857}
                    >
                      {transaction.products[0].name}
                    </Text>
                  )}
                  {transaction.products.length > 1 && (
                    <Text
                      fontSize="0.75rem"
                      fontWeight={400}
                      lineHeight={1.5}
                      color="#667085"
                    >
                      +{transaction.products.length - 1} {t('other products')}
                    </Text>
                  )}
                </SimpleGrid>
              </Flex>,
              format.number(transaction.totalAmount.value, {
                style: 'currency',
                currency: 'USD',
              }),
              <Badge
                textAlign="center"
                backgroundColor={StatusColors[transaction.status].background}
                color={StatusColors[transaction.status].color}
                borderRadius="20px"
                key="1"
              >
                {transaction.status}
              </Badge>,
              format.relativeTime(transaction.orderDate),
            ]}
          />
        ))}
      </Table.Body>
    </Table>
  );
}

export default TransactionHistoryList;
