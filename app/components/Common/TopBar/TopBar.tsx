'use client';
import { COLORS, LANGS } from '@/app/constant/UserDashboard';
import {
  Box,
  Divider,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import {
  AiOutlineCalendar,
  AiOutlineMenu,
  AiOutlineSearch,
} from 'react-icons/ai';
import { BsLightbulb } from 'react-icons/bs';
import { GoBell } from 'react-icons/go';
import { MdOutlineDarkMode } from 'react-icons/md';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useLocaleChange } from '@/app/utils/hooks/useLocaleChange';
import { useRouter } from 'next/navigation';
import IconButton from '@/app/components/Shared/IconButton';

interface Props {
  locale: string;
  onChangeSideBar: Function;
  onLogout: () => void;
}

const TopBar = (props: Props) => {
  const router = useRouter();
  const t = useTranslations('HomePage');
  const { colorMode, toggleColorMode } = useColorMode();
  const userData = window.localStorage.getItem('_shoptak-user-data');
  const changeLocale = useLocaleChange();

  let userName;
  try {
    if (!userData) throw null;
    const user = JSON.parse(userData);
    userName = `${user.firstName} ${user.lastName}`;
  } catch (e) {
    userName = 'Jay Hargudosn';
  }

  const [isMobile] = useMediaQuery('(max-width: 768px)');

  return (
    <Box
      gridColumn={2}
      display="flex"
      justifyContent={isMobile ? 'center' : 'space-between'}
      alignItems="center"
      padding={isMobile ? '0 0 0 10px' : '15px 24px'}
    >
      <Box>
        <IconButton
          onClick={() => props.onChangeSideBar()}
          aria-label="Sidebar"
          background="transparent"
          icon={<AiOutlineMenu size="20px" />}
        />
      </Box>

      <Flex>
        <IconButton
          aria-label="Search"
          background="transparent"
          icon={<AiOutlineSearch fill={COLORS._grayOne} size="20px" />}
        />
        <IconButton
          aria-label="Calendar"
          background="transparent"
          icon={<AiOutlineCalendar fill={COLORS._grayOne} size="20px" />}
        />
        <IconButton
          aria-label="Notification"
          background="transparent"
          icon={<GoBell fill={COLORS._grayOne} size="20px" />}
        />

        <Menu>
          <MenuButton
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            margin={0}
            padding={1}
            textAlign={'center'}
          >
            <Image
              width="20px"
              height="20px"
              objectFit="cover"
              borderRadius="50%"
              alt={props.locale}
              src={`/lang/${props.locale}.png`}
            />
          </MenuButton>
          <MenuList>
            {LANGS.map(lang => (
              <MenuItem
                key={lang.title}
                onClick={() => changeLocale(lang.key)}
                backgroundColor={lang.key === props.locale ? '#eae7e7' : ''}
                gap={1}
                display={'flex'}
              >
                <Image
                  width="20px"
                  height="20px"
                  objectFit="cover"
                  borderRadius="50%"
                  alt={props.locale}
                  src={lang.ico}
                />
                <Text fontSize={10}>{lang.title}</Text>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <IconButton
          onClick={toggleColorMode}
          aria-label="Search"
          background="transparent"
          icon={
            colorMode === 'light' ? (
              <MdOutlineDarkMode fill={COLORS._grayOne} size="20px" />
            ) : (
              <BsLightbulb />
            )
          }
        />
        <Divider orientation="vertical" height="40px" margin="0 10px" />
        <Flex
          height="40px"
          justifyContent="center"
          alignItems="center"
          gap="10px"
        >
          <Box width="30px" position="relative">
            <Image alt="user_avatar" src="/imgs/user.png" height="30px" />
            <Box
              position="absolute"
              right="0"
              bottom="0"
              width="10px"
              height="10px"
              borderRadius="50%"
              backgroundColor="#3DA172"
            ></Box>
          </Box>
          {isMobile ? (
            ''
          ) : (
            <Flex direction="column" textAlign="center">
              <Text fontSize={isMobile ? 10 : 14} fontWeight={'medium'}>
                {userName}
              </Text>
              <Text
                fontSize={'12px'}
                textAlign={'left'}
                color={COLORS._grayOne}
              >
                {t('Manager')}
              </Text>
            </Flex>
          )}
          <Menu>
            <MenuButton
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              margin={0}
              padding={0}
              textAlign={'center'}
            >
              <RiArrowDownSLine />
            </MenuButton>
            <MenuList>
              {!isMobile ? (
                ''
              ) : (
                <MenuItem>
                  <Flex direction="column" textAlign="center">
                    <Text fontSize={isMobile ? 15 : 14} fontWeight={'medium'}>
                      {userName}
                    </Text>
                    <Text
                      fontSize={'12px'}
                      textAlign={'left'}
                      color={COLORS._grayOne}
                    >
                      {t('Manager')}
                    </Text>
                  </Flex>
                </MenuItem>
              )}
              <MenuItem onClick={() => router.replace('/settings/profile')}>
                {t('Account')}
              </MenuItem>
              <MenuItem>{t('Billing')}</MenuItem>
              <MenuItem onClick={props.onLogout}>{t('Sign Out')}</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TopBar;
