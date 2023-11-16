'use client';
import { COLORS, TIMELINES } from '@/app/constant/UserDashboard';
import { TimelineItem } from '@/app/types/UserDashboard';
import Calendar from 'react-calendar';

import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { TranslationKey } from '@/app/types/withTranslation';

interface TimeSwitcherProps {
  customButtons?: React.ReactNode[];
  getTime: (_timeline: number) => void;
}
{
  ('');
}
const TimeSwitcher = (props: TimeSwitcherProps) => {
  const [activeTimeLine, setActiveTimeLine] = useState(1);
  const t = useTranslations('HomePage');

  const { colorMode } = useColorMode();

  const { customButtons, getTime } = props;

  return (
    <Flex
      justifyContent="space-between"
      flexDirection={{ md: 'row', base: 'column' }}
      gap={2}
    >
      <Flex
        gap={1}
        borderRadius={8}
        // padding={{ lg: '5px' }}
        padding={{ md: 2, base: 4 }}
        width="fit-content"
        backgroundColor={colorMode === 'light' ? '#fff' : '#2d3748'}
        border={`solid 0.1px ${colorMode === 'light' ? '#E0E2E7' : '#2d3748'}`}
      >
        {TIMELINES.map((timeline: TimelineItem) => (
          <Button
            onClick={() => {
              setActiveTimeLine(timeline.value);
              getTime(timeline.value);
            }}
            key={timeline.time}
            height={{ lg: '32px' }}
            width={{ lg: '80px' }}
            backgroundColor={
              activeTimeLine === timeline.value
                ? COLORS._lightSelected
                : 'transparent'
            }
          >
            <Text
              color={
                activeTimeLine === timeline.value
                  ? COLORS._primaryColor
                  : COLORS._grayOne
              }
              fontSize={'14px'}
              fontWeight={'semibold'}
            >
              {t(timeline.time as TranslationKey<'HomePage'>)}
            </Text>
          </Button>
        ))}
      </Flex>
      <Flex gap={5}>
        <Menu>
          <MenuButton
            px={4}
            py={2}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            _hover={{ bg: 'gray.400' }}
            _expanded={{ bg: 'gray.100' }}
            _focus={{ boxShadow: 'outline' }}
            border={`solid 0.1px  ${
              colorMode === 'light' ? '#fff' : '#2d3748'
            }`}
            ml={1}
            backgroundColor={colorMode === 'light' ? '#fff' : '#2d3748'}
            _active={{ background: COLORS._primaryColor }}
            aria-label="Select Dates"
          >
            <Box alignItems={'center'} gap={1} display={'flex'}>
              <AiOutlineCalendar />
              <Text>{t('Select Dates')}</Text>
            </Box>
          </MenuButton>
          <MenuList p={2}>
            <Calendar
              className={colorMode === 'light' ? '' : 'dark__background'}
              onChange={() => {}}
              value={''}
            />
          </MenuList>
        </Menu>
        {customButtons?.map(customButton => customButton)}
      </Flex>
    </Flex>
  );
};

export default TimeSwitcher;
