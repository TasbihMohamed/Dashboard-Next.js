import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import ReduxProvider from '../components/Common/Redux/ReduxProvider';
import theme from '../config/theme';
import './globals.css';

export const metadata: Metadata = {
  title: 'ShopTak - Dashboard',
  description: 'Here you can manage your own shoptak',
};

interface LayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LayoutProps) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <ColorModeScript initialColorMode={theme.config?.initialColorMode} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ChakraProvider theme={theme}>
            <ReduxProvider locale={locale}>{children}</ReduxProvider>
          </ChakraProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
