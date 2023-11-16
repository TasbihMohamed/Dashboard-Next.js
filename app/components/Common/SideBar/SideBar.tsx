'use client';
import { COLORS, NAV_ITEMS } from '@/app/constant/UserDashboard';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Image,
  Text,
  UnorderedList,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NestedNavItem from './NestedNavItem';
import { TranslationKey } from '@/app/types/withTranslation';

interface Props {
  locale: string;
}

const SideBar = (props: Props) => {
  let purePathName = usePathname();
  let pathname = usePathname().replace(props.locale, '').replace('//', '/');
  const t = useTranslations('HomePage');
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const { colorMode } = useColorMode();

  return (
    <Box
      height="100%"
      borderRight={
        colorMode === 'light'
          ? `solid 0.1px ${COLORS._borderLightColor}`
          : 'solid 0.1px #2d3748'
      }
      position={isMobile ? 'fixed' : 'relative'}
      zIndex={9}
      width={'100%'}
      transition="1200ms linear"
      backgroundColor={isMobile ? 'white' : ''}
    >
      <Flex
        flexDirection={'column'}
        alignItems={'flex-start'}
        justifyContent={'space-between'}
        height={'100vh'}
        p={2}
      >
        <UnorderedList m={0} width="100%">
          <Box
            display={'flex'}
            justifyContent={'center'}
            flexDirection={'column'}
            alignContent={'center'}
          >
            <Image width={125} mb={5} mt={5} src="/logo.png" alt="logo"></Image>
            {NAV_ITEMS.map(item => (
              <Box key={item.route}>
                {item.children ? (
                  <Accordion allowToggle>
                    <AccordionItem border={'none'} outline={'none'}>
                      <AccordionButton
                        color={
                          pathname.includes(item.route)
                            ? 'white'
                            : COLORS._grayOne
                        }
                        backgroundColor={
                          pathname.includes(item.route)
                            ? COLORS._primaryColor
                            : colorMode === 'light'
                            ? ''
                            : '#2c313d'
                        }
                        mt={0}
                        mb={1}
                        display={'flex'}
                        justifyContent={'space-between'}
                        _hover={{ backgroundColor: COLORS._hover }}
                        padding={'10px'}
                        borderRadius={5}
                        fontWeight={'bold'}
                      >
                        <Flex alignItems={'center'} gap={1}>
                          {item.icon}
                          <Text fontSize="14px">
                            {t(item.title as TranslationKey<'HomePage'>)}
                          </Text>
                        </Flex>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel margin={0} padding={0}>
                        {item.children.map(child => (
                          <Link
                            locale={props.locale}
                            key={child.title}
                            href={child.route}
                          >
                            <Button
                              _hover={{ backgroundColor: COLORS._hover }}
                              borderRadius={5}
                              padding={'10px'}
                              fontWeight={'light'}
                              display={'flex'}
                              fontSize="11px"
                              justifyContent={'flex-start'}
                              minWidth={'100%'}
                              color={
                                child.route === pathname
                                  ? 'white'
                                  : COLORS._grayOne
                              }
                              backgroundColor={
                                child.route === pathname ||
                                child.route === purePathName
                                  ? '#4c525d'
                                  : ''
                              }
                              mb={1}
                              alignItems={'center'}
                              gap={1}
                            >
                              {child.icon}
                              <Text fontWeight={'bold'} fontSize="11px">
                                {t(child.title as TranslationKey<'HomePage'>)}
                              </Text>
                            </Button>
                          </Link>
                        ))}
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  !item.isMain && (
                    <NestedNavItem
                      key={item.title}
                      t={t}
                      pathname={pathname}
                      item={item}
                    />
                  )
                )}
              </Box>
            ))}
          </Box>
        </UnorderedList>

        <UnorderedList
          position={'absolute'}
          left={0}
          bottom={5}
          margin={0}
          padding={2}
          width="100%"
        >
          {NAV_ITEMS.map(downItem => {
            if (downItem.isMain) {
              return (
                <NestedNavItem
                  key={downItem.title}
                  t={t}
                  pathname={pathname}
                  item={downItem}
                />
              );
            }
          })}
        </UnorderedList>
      </Flex>
    </Box>
  );
};

export default SideBar;
