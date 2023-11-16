'use client';
import { COLORS } from '@/app/constant/UserDashboard';
import { Box, useMediaQuery, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SideBar from '../components/Common/SideBar/SideBar';
import TopBar from '../components/Common/TopBar/TopBar';
import { setUserData } from '../slices/userSlice';
import { getUserData } from '@/app/utils/hooks/User';
import { getStoreData } from '@/app/utils/hooks/Store';
import { setStoreData } from '../slices/storeSlice';

interface Props {
  children: React.ReactNode;
  locale: string;
  setIsAuth: (_: boolean) => void;
}

const App = ({ children, locale, setIsAuth }: Props) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [isShowSideBar, setShowSideBar] = useState<boolean>(true);
  const dispatch = useDispatch();
  const user: string | null = window.localStorage.getItem('_user_data');
  let userLocal = user ? JSON.parse(user) : null;

  useEffect(() => {
    if (userLocal) {
      getUserData(userLocal.id).then(userData => {
        dispatch(setUserData(userData));
      });
      getStoreData().then(storeData => {
        dispatch(setStoreData(storeData.data));
      });
    }
  }, [userLocal, dispatch]);

  return (
    <Box width="100%" className="main__grid">
      <Flex direction="row">
        {/* <Box
      width="100%"
      height="100vh"
      display="grid"
      transition={'0.4s'}
      gridTemplateColumns={
        isShowSideBar && !isMobile ? '16.6666% 1fr' : '0 1fr'
      }
      gridTemplateRows={`${72}px 1fr`}
      className="main__grid"
      position={'relative'}
    > */}

        <Box width={isShowSideBar ? { lg: '18%', base: '40%' } : '0%'}>
          {isShowSideBar ? (
            <SideBar
              locale={locale}
              onChangeSideBar={() => setShowSideBar(false)}
            />
          ) : (
            ''
          )}
        </Box>

        <Box width={isShowSideBar ? { lg: '82%', base: '60%' } : '100%'}>
          <TopBar
            onChangeSideBar={() => setShowSideBar(!isShowSideBar)}
            locale={locale}
            onLogout={() => {
              window.localStorage.removeItem('_shoptak-user-session');
              window.localStorage.removeItem('_shoptak-user-data');
              setIsAuth(false);
            }}
          />
          <Box
            gridColumn="2"
            gridRow="2"
            backgroundColor={COLORS._lightBackground}
          >
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default App;
