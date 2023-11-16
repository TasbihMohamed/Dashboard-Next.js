'use client';
import { Button, ListItem, Text, useColorMode } from '@chakra-ui/react';
import { COLORS } from '@/app/constant/UserDashboard';
import { NavItem } from '@/app/types/UserDashboard';
import { Link } from '@chakra-ui/next-js';

interface NestedNavItemProps {
  item: NavItem;
  pathname: string;
  t: Function;
  isNotChild?: boolean;
}

const NestedNavItem = (props: NestedNavItemProps) => {
  const { item, pathname, t, isNotChild } = props;
  const { colorMode } = useColorMode();

  return (
    <ListItem
      fontSize={10}
      display={'flex'}
      position={'relative'}
      key={item.title}
    >
      <Link width="100%" _hover={{ textDecoration: 'none' }} href={item.route}>
        <Button
          _hover={{ backgroundColor: COLORS._hover, textDecoration: 'unset' }}
          borderRadius={5}
          padding={'10px'}
          textDecoration={'none'}
          fontWeight={!isNotChild ? 'bold' : 'light'}
          display={'flex'}
          justifyContent={'flex-start'}
          width={'100%'}
          color={item.route === pathname ? 'white' : COLORS._grayOne}
          backgroundColor={
            colorMode === 'light'
              ? item.route === pathname
                ? COLORS._primaryColor
                : 'white'
              : ''
          }
          alignItems={'center'}
          gap={1}
          mb={1}
        >
          {item.icon}
          <Text _hover={{ textDecoration: 'none' }} fontSize="14px">
            {t(item.title)}
          </Text>
        </Button>
      </Link>
    </ListItem>
  );
};

export default NestedNavItem;
