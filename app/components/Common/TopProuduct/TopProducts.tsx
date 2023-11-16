'use client';
import { COLORS, SalesByLocation } from '@/app/constant/UserDashboard';
import {
  Box,
  CardBody,
  Flex,
  Image,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import Card from '@/app/components/Shared/Card';

import TopProductsTablePagination from '../../Shared/Table/Table';

const TopProducts = () => {
  const t = useTranslations('HomePage');

  const { colorMode } = useColorMode();

  return (
    <Flex gap={5} flexDirection={{ base: 'column', lg: 'row' }}>
      <Box
        borderRadius={8}
        backgroundColor={
          colorMode === 'dark' ? COLORS._darkBackground : 'white'
        }
        width={{
          base: '100%',
          lg: '70%',
        }}

      >
        <TopProductsTablePagination
          filterOperators={[
            'Low Sales',
            'Low Price',
            'Low Amount',
            'Published',
            'Low Stock',
          ]}
          tableHeads={['Product', 'Sales', 'Amount', 'Price', 'Status']}
          tableRows={[]}
          tableTitle={'Top Selling Product'}
          tableWidth={'100%'}
          isFilter={true}
        />
      </Box>
      <Card
        p={5}
        width={{
          base: '100%', 
          lg: '30%',
        }}

        backgroundColor={
          colorMode === 'dark' ? COLORS._darkBackground : 'white'
        }

      >
        <CardBody padding={0}>
          <Text fontSize={18} fontWeight={'medium'}>
            {t('Sales by Location')}
          </Text>
          <Text fontSize={14} mb={2} fontWeight={'medium'}>
            {t('Sales performance by location')}
          </Text>
          {SalesByLocation.map(sales => (
            <Flex
              key={sales.country}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Flex minWidth={100}>
                <Image
                  objectFit={'contain'}
                  width={'40px'}
                  mr={1}
                  height={'40px'}
                  src="/lang/en.png"
                  alt="language"
                />
                <Box>
                  <Text
                    fontSize={14}
                    textOverflow={'ellipsis'}
                    fontWeight={'medium'}
                  >
                    {sales.country}
                  </Text>
                  <Text fontSize={12} color={COLORS._grayOne}>
                    {sales.salesCount}
                    {t('Sales')}
                  </Text>
                </Box>
              </Flex>
              <Flex alignItems={'center'} justifyContent={'center'}>
                <Text mr={1} fontSize={14} fontWeight={'medium'}>
                  ${sales.revenue.toLocaleString('en-US')}
                </Text>
                <Text
                  fontSize={12}
                  padding={1}
                  color={colorMode === 'light' ? '#fff' : '#000'}
                  borderRadius={10}
                  backgroundColor={COLORS._yellow_50}
                  fontWeight={'medium'}
                >
                  {sales.percentage}
                </Text>
              </Flex>
            </Flex>
          ))}
        </CardBody>
      </Card>
    </Flex>
  );
};

export default TopProducts;
