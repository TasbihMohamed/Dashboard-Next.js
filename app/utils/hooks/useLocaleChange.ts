import { useRouter } from 'next-intl/client';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export const useLocaleChange = () => {
  const pathname = usePathname();
  const router = useRouter();
  const _locale = useLocale();

  return (locale: string) => {
    const sanitizedPath = pathname.replace(_locale, '').replace('//', '/');
    return router.replace(sanitizedPath, { locale, scroll: false });
  };
};
