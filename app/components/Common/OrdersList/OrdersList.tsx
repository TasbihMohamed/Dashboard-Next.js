'use client';
import { COLORS } from '@/app/constant/UserDashboard';
import {
  Box,
  Checkbox,
  Flex,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
} from '@chakra-ui/react';
import { useFormatter, useTranslations } from 'next-intl';
import { AiOutlineEye } from 'react-icons/ai';
import { BiPencil } from 'react-icons/bi';
import { StatusColors } from '@/app/constant/StatusColors';
import { TranslationKey } from '@/app/types/withTranslation';
import { Link } from '@chakra-ui/next-js';
import { useEffect, useState } from 'react';
import { Order } from '@/app/types/UserDashboard';
import IconButton from '@/app/components/Shared/IconButton';
import Card from '@/app/components/Shared/Card';
import { addLeadingZeros } from '@/app/utils/add-leading-zeros';

const headCells = [
  'Order ID',
  'Product',
  'Date',
  'Total',
  'Payment',
  'Status',
  'Action',
];

interface OrderListProps {
  statusFilter: string;
  timestampFilter: number;
}

const OrdersList = ({ statusFilter, timestampFilter }: OrderListProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('HomePage');
  const format = useFormatter();
  const { colorMode } = useColorMode();

  useEffect(() => {
    setLoading(true);
    fetch('/api/orders', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          '_shoptak-user-session',
        )}`,
      },
    })
      .then(resp => resp.json())
      .then((orders: Order[]) => setOrders(orders))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Text>loading...</Text>;

  const filteredOrders = orders.filter(
    order =>
      (order.status.toLowerCase() === statusFilter.toLowerCase() ||
        statusFilter === 'All') &&
      Date.now() - new Date(order.orderDate).getTime() <= timestampFilter,
  );

  return (
    <Card
      backgroundColor={colorMode === 'dark' ? COLORS._darkBackground : 'white'}
      position="relative"
      overflow="visible"
    >
      <Flex padding={5} alignItems="center" justifyContent="space-between">
        <Flex gap={2} alignItems="center">
          <Text height="fit-content" fontSize={18}>
            {t('Recent Orders')}
          </Text>
          <Text
            height="fit-content"
            fontSize={{ lg: 14, sm: 10, md: 12 }}
            fontWeight="600"
            backgroundColor="#E7F4EE"
            color="#0D894F"
            padding="4px 12px"
            borderRadius="20px"
          >
            +2 {t('Orders')}
          </Text>
        </Flex>
      </Flex>
      <TableContainer mt={2} p={0}>
        <Table p={0} variant="simple" fontFamily="Inter">
          <Thead>
            <Tr>
              {headCells.map((cell, i) => (
                <Th
                  textAlign={i == 1 ? 'left' : 'center'}
                  paddingLeft={i == 1 ? 2 : 'auto'}
                  width={50}
                  key={cell}
                >
                  {cell === 'Order ID' ? (
                    <Flex alignItems="flex-start" gap={8}>
                      <Checkbox borderColor="#858D9D" />
                      <Text key={i}>{t(cell)}</Text>
                    </Flex>
                  ) : (
                    <Text key={i}>{t(cell as TranslationKey<'HomePage'>)}</Text>
                  )}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {filteredOrders.map((order, index) => (
              <Tr key={order.id}>
                <Td>
                  <Flex gap={8}>
                    <Checkbox borderColor="#858D9D" />
                    <Link
                      href={`/orders/${order.id}`}
                      textDecoration="none"
                      color={COLORS._primaryColor}
                      fontSize={14}
                      fontWeight={600}
                      key={index}
                    >
                      #
                      {addLeadingZeros(
                        index + 1,
                        Math.max(7, Math.floor(Math.log10(orders.length)) + 1),
                      )}
                    </Link>
                  </Flex>
                </Td>
                <Td padding={2}>
                  <Flex gap="0.5rem">
                    <Box
                      width="2.75rem"
                      height="2.75rem"
                      bg="#E0E2E7"
                      rounded={10}
                    />
                    <SimpleGrid gap="0.25rem" alignContent="center">
                      {order.products.length && (
                        <Text
                          fontSize="0.875rem"
                          fontWeight={500}
                          lineHeight={1.42857}
                        >
                          {order.products[0].name}
                        </Text>
                      )}
                      {order.products.length > 1 && (
                        <Text
                          fontSize="0.75rem"
                          fontWeight={400}
                          lineHeight={1.5}
                          color="#667085"
                        >
                          +{order.products.length - 1} {t('other products')}
                        </Text>
                      )}
                    </SimpleGrid>
                  </Flex>
                </Td>
                <Td width={50} textAlign="center" padding={0}>
                  <Text fontSize={14}>
                    {format.relativeTime(new Date(order.orderDate), Date.now())}
                  </Text>
                </Td>
                <Td width={50} textAlign="center" padding={0}>
                  <Text fontSize={14}>
                    {format.number(order.totalAmount.value, {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </Text>
                </Td>
                <Td width={50} textAlign="center" padding={0}>
                  <Text fontSize={14} textTransform="capitalize">
                    {order.paymentMethod}
                  </Text>
                </Td>
                <Td width={50} textAlign="center" padding={0}>
                  <Text
                    textAlign="center"
                    width="fit-content"
                    height="fit-content"
                    fontSize={14}
                    backgroundColor={StatusColors[order.status].background}
                    color={StatusColors[order.status].color}
                    padding="4px 12px"
                    borderRadius="20px"
                  >
                    {order.status}
                  </Text>
                </Td>
                <Td width={50} textAlign="center" padding={0}>
                  <Flex>
                    <IconButton
                      backgroundColor="transparent"
                      aria-label="preview"
                      icon={<AiOutlineEye />}
                      variant="ghost"
                    />
                    <IconButton
                      backgroundColor="transparent"
                      aria-label="edit"
                      icon={<BiPencil />}
                      variant="ghost"
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default OrdersList;
