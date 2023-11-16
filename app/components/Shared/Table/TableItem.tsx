'use client';
import { COLORS } from '@/app/constant/UserDashboard';
import { Product } from '@/app/types/UserDashboard';
import { Box, Flex, Image, Td, Text, Tr } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { TranslationKey } from '@/app/types/withTranslation';

interface Props {
  product: Product;
}

const TableItem = (props: Props) => {
  const t = useTranslations('HomePage');

  const { product } = props;

  return (
    <Tr height={0}>
      <Td height={0} width={80}>
        <Flex>
          <Image
            objectFit={'contain'}
            width={'44px'}
            mr={1}
            height={'44px'}
            src="/placeholder_product.jpg"
            alt="product placeholder"
          />
          <Box>
            <Text fontSize={14} fontWeight={'medium'}>
              {product.name}
            </Text>
            <Text fontSize={12} color={'#667085'} fontWeight={'regular'}>
              SKU: {product.sku}
            </Text>
          </Box>
        </Flex>
      </Td>
      <Td>
        <Text fontSize={14} color={'#667085'} fontWeight={'medium'}>
          {product.Sales}
        </Text>
      </Td>
      <Td>
        <Text fontSize={14} color={'#667085'} fontWeight={'medium'}>
          ${product.Amount.toLocaleString('en-US')}
        </Text>
      </Td>
      <Td>
        <Text fontSize={14} color={'#667085'} fontWeight={'medium'}>
          ${product.price}
        </Text>
      </Td>
      <Td width={95} height={28} textAlign={'left'}>
        <Box
          p={2}
          borderRadius={100}
          backgroundColor={COLORS._yellow_50}
          textAlign={'left'}
          fontSize={14}
          color={'#fff'}
          fontWeight={'medium'}
        >
          <Text color={COLORS._yellow_500}>
            {t(product.status as TranslationKey<'HomePage'>)}
          </Text>
        </Box>
      </Td>
    </Tr>
  );
};

export default TableItem;
