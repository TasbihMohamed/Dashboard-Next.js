'use client';
import App from '@/app/[locale]/_app';
import { store } from '@/app/store/store';
import { checkIsAuth } from '@/app/utils/hooks/Auth';
import { Container, useColorMode } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Login from '../Auth/Login';

interface ReduxProviderProps {
  children: React.ReactNode;
  locale: string;
}

const ReduxProvider = ({ children, locale }: ReduxProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (isAuth === null) {
      checkIsAuth().then(setIsAuth);
    }
  }, [isAuth]);

  if (isAuth === null) {
    return (
      <Container
        background={
          colorMode === 'light'
            ? 'linear-gradient(296.82deg, #F81E6E 0%, #771FCB 100%)'
            : 'transparent'
        }
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        maxWidth={'unset'}
        height={'100vh'}
      />
    );
  }

  if (!isAuth) {
    return (
      <Login
        onLogin={() => {
          setIsAuth(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <App setIsAuth={setIsAuth} locale={locale}>
        {children}
      </App>
    </Provider>
  );
};

export default ReduxProvider;
