'use client';
import { COLORS } from '@/app/constant/UserDashboard';
import { drawAnalytics, loadData } from '@/app/utils/analytics-helpers';
import {
  Box,
  CardBody,
  Flex,
  Spinner,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import Card from '@/app/components/Shared/Card';
import IconButton from '@/app/components/Shared/IconButton';

const HomeAnalytics = () => {
  const t = useTranslations('HomePage');
  const { colorMode } = useColorMode();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvasData = loadData();

  const [loaded, setLoaded] = useState(false);

  const months = useMemo(
    () => [
      t('Jan'),
      t('Feb'),
      t('Mar'),
      t('Apr'),
      t('Jun'),
      t('Jul'),
      t('Aug'),
      t('Sep'),
      t('Oct'),
      t('Nov'),
      t('Dec'),
    ],
    [t],
  );

  useEffect(() => {
    drawAnalytics(
      canvasRef.current as HTMLCanvasElement,
      canvasData,
      months,
      '$',
    );
    setLoaded(true);
  }, [canvasRef, colorMode, months, canvasData]);

  return (
    <Flex
      gap={5}
      flexDirection={{ base: 'column', lg: 'row' }}
      alignItems={{ base: 'center', lg: 'stretch' }}
    >
 
      <Card width={{ lg: 264, base: '100%' }} height="100%" padding={4}
        backgroundColor={
          colorMode === 'dark' ? COLORS._darkBackground : 'white'
        }
      >
        <CardBody padding={'20px'}>

          <Text fontWeight={'medium'} color={'black.700'}>
            {t('Real Time users')}
          </Text>
          <Text color={COLORS._grayOne}>{t('Now Visitors')}</Text>
          <Box display={'flex'} p={10} justifyContent={'center'} gap={1}>
            <Text fontSize={25} fontWeight={'bold'} color={'black.300'}>
              10
            </Text>
            <Text fontSize={25} fontWeight={'bold'} color={'green.500'}>
              {t('Users')}
            </Text>
          </Box>
          <Text color={COLORS._grayOne} textAlign={'center'}>
            {t('This analytics shows users currently in your store')}
          </Text>
        </CardBody>
      </Card>

    
      <Card  padding={4}
        backgroundColor={
          colorMode === 'dark' ? COLORS._darkBackground : 'white'
        }
        flex={1}
      >
        <CardBody padding={'20px'}>

          <Flex justifyContent="space-between">
            <Box>
              <Text fontWeight={'medium'} color={'black.700'}>
                {t('Statistics')}
              </Text>
              <Text color={COLORS._grayOne}>{t('Revenue and Sales')}</Text>
            </Box>
            <Flex gap="16px">
              <Flex alignItems="center" gap="6px" color={COLORS._grayOne}>
                <Box
                  width="12px"
                  height="12px"
                  backgroundColor="#771FCB"
                  borderRadius="50%"
                ></Box>
                {t('Revenue')}
              </Flex>
              <Flex alignItems="center" gap="6px" color={COLORS._grayOne}>
                <Box
                  width="12px"
                  height="12px"
                  backgroundColor="#E46A11"
                  borderRadius="50%"
                ></Box>
                {t('Sales')}
              </Flex>
            </Flex>
            <Flex flexDirection="column">
              <IconButton
                aria-label="settings"
                icon={<BiDotsVerticalRounded />}
                height="30px"
                backgroundColor="transparent"
              />
            </Flex>
          </Flex>
          <Box>
            <canvas
              className="analytics"
              height="252"
              ref={canvasRef}
              style={{
                width: '100%',
                height: '252px',
                position: 'relative',
              }}
            ></canvas>
            {!loaded && (
              <Flex
                justify={'center'}
                align={'center'}
                gap={5}
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  width: '100%',
                  height: 264,
                  transition: '0.4s',
                }}
              >
                <Spinner />
                {t('Loading Statistics')}
              </Flex>
            )}
          </Box>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default HomeAnalytics;
