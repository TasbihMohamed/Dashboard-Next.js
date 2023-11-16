import { COLORS } from '@/app/constant/UserDashboard';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { BiPencil } from 'react-icons/bi';

const DomainsList = () => {
  const t = useTranslations('HomePage');
  return (
    <Stack>
      <Flex gap={1} align={'center'}>
        <Text>Domains</Text>
        <Box
          _hover={{ backgroundColor: 'transparent', cursor: 'pointer' }}
          backgroundColor={'transparent'}
          aria-label="domains-edit"
        >
          <BiPencil color={COLORS._altColor} />
        </Box>
      </Flex>
      <Flex flexDirection={'column'} gap={2}>
        <Box _hover={{ filter: 'grayscale(1)' }}>
          <Link href="https://www.jhon.shoptak.dk" style={{ color: 'green' }}>
            www.jhon.shoptak.dk ({t('Shoptak Domain')})
          </Link>
        </Box>
        <Box _hover={{ filter: 'grayscale(1)' }}>
          <Link href="https://www.jhon.dk" style={{ color: 'green' }}>
            www.jhon.dk ({t('Custom Domain')})
          </Link>
        </Box>
      </Flex>
    </Stack>
  );
};

export { DomainsList };
