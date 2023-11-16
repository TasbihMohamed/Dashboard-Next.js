'use client';
import { COLORS } from '@/app/constant/UserDashboard';
import {
  Box,
  Button,
  Divider,
  Flex,
  Menu,
  ListItem,
  UnorderedList,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { CiLock } from 'react-icons/ci';
import { BiCheckCircle } from 'react-icons/bi';
import { MdOutlineMailOutline } from 'react-icons/md';
import { BsCart2, BsWallet } from 'react-icons/bs';
import { IoCallOutline, IoLocationOutline } from 'react-icons/io5';
import { GoFilter } from 'react-icons/go';
import { useTranslations } from 'next-intl';
import TransactionHistoryList from '@/app/components/Common/TransactionHistoryList/TransactionHistoryList';
import { TranslationKey } from '@/app/types/withTranslation';
import Card from '@/app/components/Shared/Card';
import IconButton from '@/app/components/Shared/IconButton';
import { useEffect, useState } from 'react';
import { OrderDetails } from '@/app/types/UserDashboard';

const filters = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

interface CustomerDetailsProps {
  id: string;
}

function CustomerDetails({ id }: CustomerDetailsProps) {
  const t = useTranslations('HomePage');
  const [customerDetails, setCustomerDetails] = useState<OrderDetails | null>(
    null,
  );
  const [statusFilter, setStatusFilter] = useState('All');

  const filterByStatus = (status: string) => {
    return () => {
      setStatusFilter(status);
    };
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          '_shoptak-user-session',
        )}`,
      },
    })
      .then(resp => resp.json())
      .then(customer =>
        setCustomerDetails({
          ...customer,
          shippingMethod: 'Flat Shipping',
          invoice: 'Invoice',
          shipping: 'SHP-2011REG',
          rewards: '480 point',
        }),
      )
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Text>loading...</Text>;

  if (!customerDetails) return <></>;

  const address = `${customerDetails?.addresses?.[0]?.street1} ${customerDetails?.addresses?.[0]?.city} ${customerDetails?.addresses?.[0]?.state}, ${customerDetails?.addresses?.[0]?.postalCode} ${customerDetails?.addresses?.[0]?.country}`;

  const filteredOrders = customerDetails.orders.filter(
    order =>
      order.status.toLowerCase() === statusFilter.toLowerCase() ||
      statusFilter === 'All',
  );

  return (
    <Flex justifyContent="space-between">
      <Card p={1} w="370px" position="relative" h="73vh" pb={0}>
        <Text bg={COLORS._primaryColor} h="130px" borderRadius="5px" />
        <Box
          w="130px"
          h="130px"
          borderRadius="50%"
          bg="#E0E2E7"
          position="absolute"
          top="10%"
          left="28%"
          color="#E0E2E7"
        ></Box>
        <Flex justifyContent="center" mt="60px">
          <Text fontWeight="bold" mr="6px">
            {customerDetails.name}
          </Text>
          <Text
            color={COLORS._primaryColor}
            fontSize={12}
            bg="#EFEFFD"
            px="3px"
            py="2px"
            borderRadius="6px"
          >
            {t('Premium')}
          </Text>
        </Flex>
        <Text textAlign="center">
          @{customerDetails.email.replace(/@.*/, '')}
        </Text>
        <Divider w="95%" my="10px" mx="auto" color="#E0E2E7" />
        <UnorderedList ms="7px">
          {/* ListItem */}
          <ListItem mb="10px">
            <Flex alignItems="center">
              <IconButton
                aria-label="test"
                icon={<CiLock />}
                borderRadius="50%"
                mr="10px"
                fontSize="20px"
                flexShrink={0}
              />
              <Flex flexDirection="column">
                <Text fontSize="14px" fontWeight="500" color="#4D5464">
                  {t('User ID')}
                </Text>
                <Text fontWeight="500" fontSize="14px" color="#1A1C21">
                  {customerDetails.id}
                </Text>
              </Flex>
            </Flex>
          </ListItem>
          {/* ListItem */}
          <ListItem mb="10px">
            <Flex alignItems="center">
              <IconButton
                aria-label="test"
                icon={<MdOutlineMailOutline />}
                mr="10px"
                fontSize="20px"
                color="#667085"
              />
              <Flex flexDirection="column">
                <Text fontSize="14px" fontWeight="500" color="#4D5464">
                  {t('Billing Email')}
                </Text>
                <Text fontWeight="500" fontSize="14px" color="#1A1C21">
                  {customerDetails.email}
                </Text>
              </Flex>
            </Flex>
          </ListItem>
          {/* ListItem */}
          <ListItem mb="10px">
            <Flex alignItems="center">
              <IconButton
                aria-label="test"
                icon={<IoCallOutline />}
                borderRadius="50%"
                mr="10px"
                fontSize="20px"
              />
              <Flex flexDirection="column">
                <Text fontSize="14px" fontWeight="500" color="#4D5464">
                  {t('Phone Number')}
                </Text>
                <Text fontWeight="500" fontSize="14px" color="#1A1C21">
                  {customerDetails.phone}
                </Text>
              </Flex>
            </Flex>
          </ListItem>
          <ListItem mb="10px">
            <Flex alignItems="center">
              <IconButton
                aria-label="test"
                icon={<IoLocationOutline />}
                borderRadius="50%"
                mr="10px"
                fontSize="20px"
              />
              <Flex flexDirection="column">
                <Text fontSize="14px" fontWeight="500" color="#4D5464">
                  {t('Delivery Address')}
                </Text>
                <Text fontWeight="500" fontSize="14px" color="#1A1C21">
                  {address}
                </Text>
              </Flex>
            </Flex>
          </ListItem>
          <ListItem mb="10px">
            <Flex alignItems="center">
              <IconButton
                aria-label="test"
                icon={<BsCart2 />}
                borderRadius="50%"
                mr="10px"
                fontSize="20px"
              />
              <Flex flexDirection="column">
                <Text fontSize="14px" fontWeight="500" color="#4D5464">
                  {t('Latest Transaction')}
                </Text>
                <Text fontWeight="500" fontSize="14px" color="#1A1C21">
                  {new Date(customerDetails.lastOrderDate).toLocaleDateString()}
                </Text>
              </Flex>
            </Flex>
          </ListItem>
        </UnorderedList>
      </Card>

      <Flex flexDirection="column" w="80%">
        {/* cards  */}
        <Flex justifyContent="space-between" gap="10px" ms="10px">
          {/* Card 1 */}
          <Card width="33%" h="140px" p="10px">
            <IconButton
              aria-label="test"
              icon={<BsWallet />}
              borderRadius="50%"
              color="#0D894F"
              bg="#0d894f2b"
              fontSize="20px"
            />
            <Text color="#667085" py="10px">
              {t('Total Balance')}
            </Text>
            <Flex alignItems="center">
              <Text fontSize="24px" color="#333843" me="4px">
                $723.00
              </Text>
              <Text
                color="#F81E6E"
                bg="#FEEDEC"
                fontSize="12px"
                borderRadius="3px"
                p="1px"
              >
                -25%
              </Text>
            </Flex>
          </Card>
          {/* Card 2 */}
          <Card width="33%" h="140px" p="10px">
            <IconButton
              aria-label="test"
              icon={<BsCart2 />}
              borderRadius="50%"
              color="#E46A11"
              bg="#FAE1CF"
              fontSize="20px"
            />
            <Text color="#667085" py="10px">
              {t('Total Orders')}
            </Text>
            <Flex alignItems="center">
              <Text fontSize="24px" color="#333843" me="4px">
                1,296
              </Text>
              <Text
                color="#0D894F"
                bg="#0d894f2b"
                fontSize="12px"
                borderRadius="3px"
                p="1px"
              >
                +10%
              </Text>
            </Flex>
          </Card>
          {/* Card 3 */}
          <Card width="33%" h="140px" p="10px">
            <IconButton
              aria-label="test"
              icon={<BiCheckCircle />}
              borderRadius="50%"
              color="#771FCB"
              bg="#DEDEFA"
              fontSize="20px"
            />
            <Text color="#667085" py="10px">
              {t('Rewards Point')}
            </Text>
            <Flex alignItems="center">
              <Text fontSize="24px" color="#333843" me="4px">
                1400
              </Text>
              <Text
                color="#0D894F"
                bg="#0d894f2b"
                fontSize="12px"
                borderRadius="3px"
                p="1px"
              >
                +10%
              </Text>
            </Flex>
          </Card>
        </Flex>
        <Card ms="10px" mt="10px" p="13px">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="18px" fontWeight="500">
              {t('Transaction History')}
            </Text>
            <Flex>
              <Menu>
                <MenuButton as={Button} leftIcon={<GoFilter />}>
                  <Text ml={1} fontWeight="semibold" fontSize={14}>
                    {t('Filters')}
                  </Text>
                </MenuButton>
                <MenuList>
                  {filters.map(status => (
                    <MenuItem key={status} onClick={filterByStatus(status)}>
                      {t(status as TranslationKey<'HomePage'>)}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
          <TransactionHistoryList transactions={filteredOrders} />
        </Card>
      </Flex>
    </Flex>
  );
}

export default CustomerDetails;
