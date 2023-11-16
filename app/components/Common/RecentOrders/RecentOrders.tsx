'use client';
import { COLORS, RecentOrdersData } from '@/app/constant/UserDashboard';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import { useTranslations } from 'next-intl';
import { AiOutlineEye } from 'react-icons/ai';
import { BiPencil } from 'react-icons/bi';
import { GoFilter } from 'react-icons/go';
import { statusColorFilters, StatusColors } from '@/app/constant/StatusColors';
import { parseDate } from '@/app/utils/date';
import { TranslationKey } from '@/app/types/withTranslation';
import { Link } from '@chakra-ui/next-js';
import Card from '@/app/components/Shared/Card';
import IconButton from '@/app/components/Shared/IconButton';

const headCells = [
  'Order ID',
  'Product',
  'Date',
  'Customer',
  'Total',
  'Payment',
  'Status',
  'Action',
];

const RecentOrders = () => {
  const t = useTranslations('HomePage');
  const { colorMode } = useColorMode();
  return (
    <Card
      backgroundColor={colorMode === 'dark' ? COLORS._darkBackground : 'white'}
      position={'relative'}
    >
      <Flex padding={5} alignItems={'center'} justifyContent="space-between">
        <Flex gap={2} alignItems={'center'}>
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
        <Flex zIndex={999} gap={5}>
          <Menu>
            <MenuButton as={Button} leftIcon={<GoFilter />}>
              <Text ml={1} fontWeight={'semibold'} fontSize={14}>
                {t('Filters')}
              </Text>
            </MenuButton>
            <MenuList>
              {statusColorFilters.map(keyword => (
                <MenuItem key={keyword}>
                  {t(keyword as TranslationKey<'HomePage'>)}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Button
            backgroundColor={COLORS._primaryColor}
            color="#FFFFFF"
            _hover={{ backgroundColor: '#771FCB' }}
          >
            <Text>{t('See More')}</Text>
          </Button>
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
                    <Flex alignItems={'flex-start'} gap={8}>
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
            {RecentOrdersData.map((order, i) => (
              <Tr key={order.title}>
                <Td>
                  <Flex gap={8}>
                    <Checkbox borderColor="#858D9D" />
                    <Link
                      href="#"
                      _hover={{ color: COLORS._primaryColor }}
                      style={{ textDecoration: 'none' }}
                      fontSize={14}
                      key={i}
                    >
                      #{order.id}
                    </Link>
                  </Flex>
                </Td>
                <Td padding={2}>
                  <Flex gap={8}>
                    <Box
                      width="44px"
                      height="44px"
                      borderRadius={8}
                      backgroundColor="#E0E2E7"
                    ></Box>
                    <Flex flexDirection="column" justifyContent="space-around">
                      <Text fontSize={14}>{order.title}</Text>
                      {order.extraProductsCount && (
                        <Text fontSize={12}>
                          +{order.extraProductsCount} other product
                          {order.extraProductsCount > 1 && 's'}
                        </Text>
                      )}
                    </Flex>
                  </Flex>
                </Td>
                <Td width={50} textAlign={'center'} padding={0}>
                  <Text fontSize={14}>{parseDate(order.date)}</Text>
                </Td>
                <Td width={50} textAlign={'center'} padding={3}>
                  <Flex flexDirection="column" gap="4px">
                    <Text fontSize={14}>{order.customer.name}</Text>
                    <Text fontSize={12}>{order.customer.email}</Text>
                  </Flex>
                </Td>
                <Td width={50} textAlign={'center'} padding={0}>
                  <Text fontSize={14}>{order.total}</Text>
                </Td>
                <Td width={50} textAlign={'center'} padding={0}>
                  <Text fontSize={14}>{order.payment}</Text>
                </Td>
                <Td width={50} textAlign={'center'} padding={0}>
                  <Text
                    textAlign="center"
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
                <Td
                  margin={13}
                  display={'flex'}
                  width={50}
                  textAlign={'center'}
                  padding={0}
                >
                  <IconButton
                    backgroundColor="transparent"
                    aria-label="preview"
                    icon={<AiOutlineEye />}
                  />
                  <IconButton
                    backgroundColor="transparent"
                    aria-label="edit"
                    icon={<BiPencil />}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default RecentOrders;
