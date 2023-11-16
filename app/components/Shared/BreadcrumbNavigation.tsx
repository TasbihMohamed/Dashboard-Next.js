import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonProps,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import { RiArrowRightSLine } from 'react-icons/ri';
import React from 'react';
import { COLORS } from '@/app/constant/UserDashboard';
import { useRouter } from 'next/navigation';

type Item = {
  label: string;
  link: string;
};

type Action = Omit<ButtonProps, 'children'> & { title: string };

interface PageSubHeaderProps {
  title: string;
  items: Item[];
  actions?: Action[];
}

export default function BreadcrumbNavigation(props: PageSubHeaderProps) {
  const router = useRouter();

  return (
    <Flex alignItems="end" gap="1rem" justifyContent="space-between" w="100%">
      <Stack gap="0.5rem">
        <Text
          fontSize="1.5rem"
          fontWeight={500}
          lineHeight={1.33333}
          letterSpacing="0.12px"
        >
          {props.title}
        </Text>

        <Breadcrumb separator={<RiArrowRightSLine />}>
          {props.items.map((item, index) => (
            <BreadcrumbItem
              key={item.link}
              isCurrentPage={index === props.items.length - 1}
            >
              <BreadcrumbLink
                href={item.link}
                color={COLORS._primaryColor}
                fontSize="0.875rem"
                fontWeight={500}
                lineHeight={1.42857}
                letterSpacing="0.07px"
                css={{
                  "&[aria-current='page']": {
                    color: COLORS._grayOne,
                  },
                }}
                onClick={evt => {
                  evt.preventDefault();
                  router.push(item.link);
                }}
              >
                {item.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </Stack>
      <Flex gap="1rem">
        {props.actions?.map((action, index) => (
          <Button key={index} {...action} title="">
            {action.title}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
}
