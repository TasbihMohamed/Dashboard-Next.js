'use client';
import {
  Box,
  CardHeader,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useFormatter, useTranslations } from 'next-intl';
import Card from '@/app/components/Shared/Card';
import { Order, Product } from '@/app/types/UserDashboard';

const headCells = ['Product', 'SKU', 'QTY', 'Price', 'Total'];

const emptyCells = (
  <>
    <Td></Td>
    <Td></Td>
    <Td></Td>
  </>
);

interface OrderDetailsListProps {
  products: Product[];
  totalAmount?: Order['totalAmount'];
}

const OrdersDetailsList = ({
  products,
  totalAmount,
}: OrderDetailsListProps) => {
  const t = useTranslations('HomePage');
  const format = useFormatter();

  const subtotal = products.reduce((totalAmount, product) => {
    return totalAmount + product.price * product.quantity;
  }, 0);

  return (
    <Card position="relative" w="100%">
      <CardHeader>
        <Text height="fit-content" fontSize={18}>
          {t('Order List')}
        </Text>
      </CardHeader>
      <TableContainer mt={2} p={0}>
        <Table p={0} variant="simple" fontFamily="Inter" w="100%">
          <Thead>
            <Tr>
              {headCells.map((cell, i) => (
                <Th width={50} key={cell}>
                  <Text key={i}>{cell}</Text>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {products.map(product => (
              <Tr key={product.name}>
                <Td>
                  <Flex gap={8} alignItems="center">
                    <Box
                      width="44px"
                      height="44px"
                      borderRadius={8}
                      backgroundColor="#E0E2E7"
                    ></Box>
                    <Text
                      width="13ch"
                      overflow="hidden"
                      fontSize={{ base: 8, md: 14 }}
                      textOverflow="ellipsis"
                    >
                      {product.name}
                    </Text>
                  </Flex>
                </Td>
                <Td>{product.sku ?? 'N/A'}</Td>
                <Td>{product.quantity ?? 'N/A'}</Td>
                <Td>
                  {format.number(product.price, {
                    style: 'currency',
                    currency: 'USD',
                  }) ?? 'N/A'}
                </Td>
                <Td>
                  {format.number(product.price * product.quantity, {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </Td>
              </Tr>
            ))}
            <Tr h="76.8px">
              {emptyCells}
              <Td>Subtotal</Td>
              <Td>
                {format.number(subtotal ?? 0, {
                  style: 'currency',
                  currency: totalAmount?.unit,
                })}
              </Td>
            </Tr>
            <Tr h="76.8px">
              {emptyCells}
              <Td>VAT (0%)</Td>
              <Td>$0</Td>
            </Tr>
            <Tr h="76.8px">
              {emptyCells}
              <Td>Shipping Rate</Td>
              <Td>$5.00</Td>
            </Tr>
            <Tr h="76.8px">
              {emptyCells}
              <Td>Grand Total</Td>
              <Td fontWeight={600}>
                {format.number(totalAmount?.value ?? 0, {
                  style: 'currency',
                  currency: totalAmount?.unit,
                })}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default OrdersDetailsList;
