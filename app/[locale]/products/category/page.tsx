'use client';
import CategoryList from '@/app/components/Common/Categories/CategoryList';
import { COLORS } from '@/app/constant/UserDashboard';
import {
  Box,
  Flex,
  Input,
  Stack,
  Text,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useTranslations } from 'next-intl';

interface Props {
  params: { locale: string };
  searchParams: {};
}

const Category = (_: Props) => {
  const { colorMode } = useColorMode();
  const [searchKeyWord, setSearchKeyWord] = useState<string>('');
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const t = useTranslations('HomePage');

  return (
    <Stack
      gap={3}
      padding={4}
      height={'100hv'}
      backgroundColor={'E0E2E7'}
      overflow={'hidden'}
    >
      <Flex
        align={'center'}
        justify={isMobile ? 'flex-start' : 'space-between'}
        gap={isMobile ? 10 : 8}
      >
        <Box>
          <Text fontSize={isMobile ? '16px' : '24px'}>Categories</Text>
          <Flex alignItems={'center'} display={'flex'} gap={0}>
            <Text
              fontSize={isMobile ? '8px' : '16px'}
              color={COLORS._primaryColor}
            >
              {t('Dashboard')}
            </Text>{' '}
            <RiArrowRightSLine />{' '}
            <Text
              fontSize={isMobile ? '8px' : '16px'}
              color={COLORS._primaryColor}
            >
              {t('Products')}
            </Text>
            <RiArrowRightSLine />{' '}
            <Text fontSize={isMobile ? '8px' : '16px'} color={COLORS._grayOne}>
              Categories List
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Box w={isMobile ? '90vw' : '100%'} position={'relative'}>
        <Input
          borderRadius={8}
          type="text"
          placeholder="Search category. . ."
          backgroundColor={colorMode === 'light' ? '#fff' : '#2c313d'}
          onChange={e => setSearchKeyWord(e.target.value)}
          value={searchKeyWord}
          paddingLeft={8}
        />
        <Box left={3} top={3} position={'absolute'}>
          <BiSearch
            fontSize={18}
            fill={colorMode === 'light' ? 'black.500' : COLORS._grayOne}
          />
        </Box>
      </Box>
      <CategoryList searchKeyWord={searchKeyWord} />
    </Stack>
  );
};

export default Category;
