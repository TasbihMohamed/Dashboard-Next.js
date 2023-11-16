'use client';
import { COLORS } from '@/app/constant/UserDashboard';
import { Flex, Spinner } from '@chakra-ui/react';
const Loading = () => {
  return (
    <Flex
      width={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
      position={'fixed'}
      backgroundColor={'#eadeedcc'}
      height={'100vh'}
      top={0}
      zIndex={1}
    >
      <Spinner color={COLORS._primaryColor} />
    </Flex>
  );
};

export default Loading;
