'use client';
import OrdersDetailsList from '@/app/components/Common/OrderDetails/OrderDetailsList';
import { COLORS } from '@/app/constant/UserDashboard';
import {
  CardBody,
  CardHeader,
  Flex,
  SimpleGrid,
  Stack,
  Step,
  StepDescription,
  StepIndicator,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { BsPhoneFill } from 'react-icons/bs';
import BreadcrumbNavigation from '@/app/components/Shared/BreadcrumbNavigation';
import { PiExportBold } from 'react-icons/pi';
import IconButton from '@/app/components/Shared/IconButton';
import { TbFileInvoice } from 'react-icons/tb';
import { ReactNode, useEffect, useState } from 'react';
import List from '@/app/components/Shared/List';
import {
  MdOutlineDateRange,
  MdOutlineLocalShipping,
  MdOutlinePersonOutline,
  MdPayment,
} from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import { GoVerified } from 'react-icons/go';
import { CiLocationOn } from 'react-icons/ci';
import { Order } from '@/app/types/UserDashboard';
import Card from '@/app/components/Shared/Card';
import { StatusColors } from '@/app/constant/StatusColors';

const activeIconStyle = {
  bg: '#EFEFFD',
  css: { '& svg': { fill: '#771FCB' } },
  _after: {
    bg: '#DEDEFA',
  },
  _hover: {
    bg: '#EFEFFD',
  },
};

type OrderStatusStep = {
  icon: ReactNode;
  completeIcon: ReactNode;
  title: string;
  description?: string;
  date: string;
};

const orderStatusSteps: OrderStatusStep[] = [
  {
    icon: (
      <IconButton variant="circle" aria-label="icon" icon={<CiLocationOn />} />
    ),
    completeIcon: (
      <IconButton
        variant="circle"
        aria-label="icon"
        icon={<CiLocationOn />}
        {...activeIconStyle}
      />
    ),
    title: 'Order Placed',
    description: 'An order has been placed.',
    date: '12/12/2022, 03:00',
  },
  {
    icon: (
      <IconButton variant="circle" aria-label="icon" icon={<CiLocationOn />} />
    ),
    completeIcon: (
      <IconButton
        variant="circle"
        aria-label="icon"
        icon={<CiLocationOn />}
        {...activeIconStyle}
      />
    ),
    title: 'Processing',
    description: 'Seller has proccessed your order.',
    date: '12/12/2022, 03:15',
  },
  {
    icon: (
      <IconButton variant="circle" aria-label="icon" icon={<CiLocationOn />} />
    ),
    completeIcon: (
      <IconButton
        variant="circle"
        aria-label="icon"
        icon={<CiLocationOn />}
        {...activeIconStyle}
      />
    ),
    title: 'Packed',
    date: 'DD/MM/YY, 00:00',
  },
  {
    icon: (
      <IconButton variant="circle" aria-label="icon" icon={<CiLocationOn />} />
    ),
    completeIcon: (
      <IconButton
        variant="circle"
        aria-label="icon"
        icon={<CiLocationOn />}
        {...activeIconStyle}
      />
    ),
    title: 'Shipping',
    date: 'DD/MM/YY, 00:00',
  },
  {
    icon: (
      <IconButton variant="circle" aria-label="icon" icon={<CiLocationOn />} />
    ),
    completeIcon: (
      <IconButton
        variant="circle"
        aria-label="icon"
        icon={<CiLocationOn />}
        {...activeIconStyle}
      />
    ),
    title: 'Delivered',
    date: 'DD/MM/YY, 00:00',
  },
];

interface OrderDetailsProps {
  params: { id: string };
  searchParams: {};
}

const OrderDetails = ({ params }: OrderDetailsProps) => {
  const t = useTranslations('HomePage');
  const [order, setOrder] = useState<Partial<Order>>({});

  const activeStep = 3;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    setLoading(true);
    fetch(`/api/orders/${params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          '_shoptak-user-session',
        )}`,
      },
    })
      .then(resp => resp.json())
      .then(order =>
        setOrder({
          ...order,
          shippingMethod: 'Flat Shipping',
          customer: 'Josh Adam',
          email: 'josh_adam@mail.com',
          phone: '909 427 2910',
          invoice: 'Invoice',
          shipping: 'SHP-2011REG',
          rewards: '480 point',
        }),
      )
      .finally(() => {
        setLoading(false);
      });
  }, [params.id]);

  if (loading)
    return (
      <Text padding="24px 24px" pl="32px">
        loading...
      </Text>
    );

  const status = order?.status ?? 'Cancelled';
  const address = `${order?.shippingAddress?.street1} ${order?.shippingAddress?.city} ${order?.shippingAddress?.state}, ${order?.shippingAddress?.postalCode} ${order?.shippingAddress?.country}`;

  return (
    <Stack
      gap={3}
      padding="24px 24px"
      pl="32px"
      height={'100hv'}
      backgroundColor={'E0E2E7'}
    >
      <BreadcrumbNavigation
        title="Orders"
        items={[
          { label: t('Dashboard'), link: '/' },
          { label: t('Order List'), link: '/orders' },
          { label: t('Order Details'), link: '#' },
        ]}
        actions={[
          {
            title: 'Export',
            leftIcon: <PiExportBold />,
            bg: COLORS._primaryColor100,
            color: COLORS._primaryColor,
            _hover: {
              bg: COLORS._primaryColor50,
              color: COLORS._primaryColor,
            },
          },
          {
            title: 'Invoice',
            leftIcon: <TbFileInvoice />,
            bg: COLORS._primaryColor,
            color: 'white',
            _hover: {
              bg: COLORS._primaryColor100,
              color: COLORS._primaryColor,
            },
          },
        ]}
      />

      <SimpleGrid
        gridTemplateColumns={{ sm: '1fr 1fr', xl: '1fr 1fr 1fr' }}
        justifyContent="space-between"
        gap="24px"
        minW="max-content"
      >
        <List
          width="100%"
          title="Order #302011"
          badges={[
            {
              children: status,
              ...StatusColors[status],
            },
          ]}
        >
          <List.Item alignItems="center">
            <IconButton
              variant="circle"
              aria-label="icon"
              icon={<MdOutlineDateRange />}
            />
            <List.ItemTitle>Added</List.ItemTitle>
            <Text ml="auto">
              {order?.orderDate &&
                new Date(order?.orderDate).toLocaleDateString()}
            </Text>
          </List.Item>
          <List.Item alignItems="center">
            <IconButton
              variant="circle"
              aria-label="icon"
              icon={<MdPayment />}
            />
            <List.ItemTitle>Payment Method</List.ItemTitle>
            <Text ml="auto">{order?.paymentMethod}</Text>
          </List.Item>
          <List.Item alignItems="center">
            <IconButton
              variant="circle"
              aria-label="icon"
              icon={<MdOutlineLocalShipping />}
            />
            <List.ItemTitle>Shipping Method</List.ItemTitle>
            <Text ml="auto">{order?.shippingMethod}</Text>
          </List.Item>
        </List>

        <List width="100%" title="Customer">
          <List.Item alignItems="center">
            <IconButton
              variant="circle"
              aria-label="icon"
              icon={<MdOutlinePersonOutline />}
            />
            <List.ItemTitle>Customer</List.ItemTitle>
            <Text ml="auto">{order?.customer}</Text>
          </List.Item>
          <List.Item alignItems="center">
            <IconButton
              variant="circle"
              aria-label="icon"
              icon={<HiOutlineMail />}
            />
            <List.ItemTitle>Email</List.ItemTitle>
            <Text ml="auto">{order?.email}</Text>
          </List.Item>
          <List.Item alignItems="center">
            <IconButton
              variant="circle"
              aria-label="icon"
              icon={<BsPhoneFill />}
            />
            <List.ItemTitle>Phone</List.ItemTitle>
            <Text ml="auto">{order?.phone}</Text>
          </List.Item>
        </List>

        <List width="100%" title="Document">
          <List.Item alignItems="center">
            <IconButton
              variant="circle"
              aria-label="icon"
              icon={<TbFileInvoice />}
            />
            <List.ItemTitle>Invoice</List.ItemTitle>
            <Text ml="auto">{order?.invoice}</Text>
          </List.Item>
          <List.Item alignItems="center">
            <IconButton
              variant="circle"
              aria-label="icon"
              icon={<MdOutlineLocalShipping />}
            />
            <List.ItemTitle>Shipping</List.ItemTitle>
            <Text ml="auto">{order?.shipping}</Text>
          </List.Item>
          <List.Item alignItems="center">
            <IconButton
              variant="circle"
              aria-label="icon"
              icon={<GoVerified />}
            />
            <List.ItemTitle>Rewards</List.ItemTitle>
            <Text ml="auto">{order?.rewards}</Text>
          </List.Item>
        </List>

        <Flex gridColumn="span 2" h="fit-content">
          <OrdersDetailsList
            products={order.products ?? []}
            totalAmount={order.totalAmount}
          />
        </Flex>

        <SimpleGrid
          gridColumn={{ base: '1 / -1', xl: 'span 1' }}
          gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr', xl: '1fr' }}
          placeContent="start"
          gap="24px"
        >
          <List
            width="100%"
            title="Address"
            CardProps={{
              h: 'fit-content',
            }}
          >
            <List.Item>
              <IconButton
                variant="circle"
                aria-label="icon"
                icon={<CiLocationOn />}
              />
              <SimpleGrid h="fit-content">
                <List.ItemTitle>Billing</List.ItemTitle>
                <List.ItemSubtitle>{address}</List.ItemSubtitle>
              </SimpleGrid>
            </List.Item>
            <List.Item>
              <IconButton
                variant="circle"
                aria-label="icon"
                icon={<CiLocationOn />}
              />
              <SimpleGrid h="fit-content">
                <List.ItemTitle>Shipping</List.ItemTitle>
                <List.ItemSubtitle>{address}</List.ItemSubtitle>
              </SimpleGrid>
            </List.Item>
          </List>

          <Card>
            <CardHeader>
              <Text>Order Status</Text>
            </CardHeader>
            <CardBody>
              <Stepper
                index={activeStep}
                orientation="vertical"
                height="400px"
                gap="0"
              >
                {orderStatusSteps.map((step, index) => (
                  <Step key={index} style={{ gap: '0.5rem' }}>
                    <StepIndicator>
                      <StepStatus
                        active={step.icon}
                        incomplete={step.icon}
                        complete={step.completeIcon}
                      />
                    </StepIndicator>
                    <SimpleGrid h="fit-content" gap="0.5rem">
                      <StepTitle
                        style={{ fontFamily: 'Inter', lineHeight: 1.5 }}
                      >
                        {step.title}
                      </StepTitle>
                      {step.description && (
                        <StepDescription
                          style={{
                            fontSize: '0.875rem',
                            lineHeight: 1.42857,
                            color: '#4D5464',
                          }}
                        >
                          {step.description}
                        </StepDescription>
                      )}
                      <Text fontSize="0.75rem" lineHeight={1.5} color="#858D9D">
                        {step.date}
                      </Text>
                    </SimpleGrid>
                    <StepSeparator style={{ background: '#E0E2E7' }} />
                  </Step>
                ))}
              </Stepper>
            </CardBody>
          </Card>
        </SimpleGrid>
      </SimpleGrid>
    </Stack>
  );
};

export default OrderDetails;
