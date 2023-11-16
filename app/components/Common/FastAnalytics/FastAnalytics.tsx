'use client';
import { COLORS } from '@/app/constant/UserDashboard';
import {
  Box,
  CardBody,
  Flex,
  Text,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IoIosBarcode } from 'react-icons/io';
import { PiMoneyBold } from 'react-icons/pi';
import Card from '@/app/components/Shared/Card';

const FastAnalytics = () => {
  const t = useTranslations('HomePage');
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { colorMode } = useColorMode();
  return (

    <Flex
      flexDirection="row"
      gap={5}
      alignItems={'center'}
      justifyContent={{ base: 'center', lg: 'start' }}
      flexWrap={'wrap'}
    >
    
      <Card
         padding={4}
        backgroundColor={
          colorMode === 'dark' ? COLORS._darkBackground : 'white'
        }
        width={264}
      >
        <CardBody padding={'20px'}>

          <Flex
            justifyContent={'center'}
            borderRadius={'50%'}
            alignItems={'center'}
            backgroundColor={COLORS._lightSelectedTwo}
            width={'40px'}
            height={'40px'}
          >
            <Flex
              borderRadius={'50%'}
              backgroundColor={COLORS._lightSelected}
              width={'30px'}
              height={'30px'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <PiMoneyBold color={COLORS._primaryColor} />
            </Flex>
          </Flex>
          <Text
            fontSize={16}
            mt={2}
            fontWeight={'medium'}
            color={COLORS._grayOne}
          >
            {t('Total Revenue')}
          </Text>
          <Flex gap={2} alignItems={'center'}>
            <Text fontSize={24} color={'black.700'} fontWeight={'medium'}>
              $0,00
            </Text>
            <Box p={1} borderRadius={10} backgroundColor={'green.50'}>
              <Text fontSize={12} color={'green.500'} fontWeight={'medium'}>
                +10%
              </Text>
            </Box>
          </Flex>
        </CardBody>
      </Card>

  
      <Card
         padding={4}
        backgroundColor={
          colorMode === 'dark' ? COLORS._darkBackground : 'white'
        }
        width={264}
      >
        <CardBody padding={'20px'}>

          <Flex
            justifyContent={'center'}
            borderRadius={'50%'}
            alignItems={'center'}
            backgroundColor={'green.100'}
            width={'40px'}
            height={'40px'}
          >
            <Flex
              borderRadius={'50%'}
              backgroundColor={'green.200'}
              width={'30px'}
              height={'30px'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <AiOutlineShoppingCart color={'green.500'} />
            </Flex>
          </Flex>
          <Text
            fontSize={16}
            mt={2}
            fontWeight={'medium'}
            color={COLORS._grayOne}
          >
            {t('Total Sales')}
          </Text>
          <Flex gap={2} alignItems={'center'}>
            <Text fontSize={24} color={'black.700'} fontWeight={'medium'}>
              0,00
            </Text>
            <Box p={1} borderRadius={10} backgroundColor={'green.50'}>
              <Text fontSize={12} color={'green.500'} fontWeight={'medium'}>
                +15%
              </Text>
            </Box>
          </Flex>
        </CardBody>
      </Card>

      <Card width={264} padding={4}  backgroundColor={
          colorMode === 'dark' ? COLORS._darkBackground : 'white'
        }>   
        <CardBody padding={'20px'}>

          <Flex
            justifyContent={'center'}
            borderRadius={'50%'}
            alignItems={'center'}
            backgroundColor={'red.100'}
            width={'40px'}
            height={'40px'}
          >
            <Flex
              borderRadius={'50%'}
              backgroundColor={'red.200'}
              width={'30px'}
              height={'30px'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <IoIosBarcode fill={'red.50'} color={'red.50'} />
            </Flex>
          </Flex>
          <Text
            fontSize={16}
            mt={2}
            fontWeight={'medium'}
            color={COLORS._grayOne}
          >
            {t('Product SKU')}
          </Text>
          <Flex gap={2} alignItems={'center'}>
            <Text fontSize={24} fontWeight={'medium'}>
              0
            </Text>
            <Box p={1} borderRadius={10} backgroundColor={'red.50'}>
              <Text fontSize={12} color={'red.500'} fontWeight={'medium'}>
                +12%
              </Text>
            </Box>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default FastAnalytics;
