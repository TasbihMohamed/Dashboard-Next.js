'use client';
import { Stack } from '@chakra-ui/react';
import FastAnalytics from '../components/Common/FastAnalytics/FastAnalytics';
import HomeAnalytics from '../components/Common/HomeAnalytics/HomeAnalytics';
import RecentOrders from '../components/Common/RecentOrders/RecentOrders';
import TimeSwitcher from '../components/Common/TimeSwitcher/TimeSwitcher';
import TopProducts from '../components/Common/TopProuduct/TopProducts';

interface HomeProps {
  params: { locale: string };
  searchParams: {};
}

const Home = (_: HomeProps) => {
  return (
    <Stack margin={4} gap={25}>
      <TimeSwitcher getTime={(_: number) => {}} />
      <FastAnalytics />
      <HomeAnalytics />
      <TopProducts />
      <RecentOrders />
    </Stack>
  );
};

export default Home;
