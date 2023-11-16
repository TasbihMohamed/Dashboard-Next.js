'use client';
import {
  CardBody,
  CardHeader,
  Flex,
  Heading,
  List as DefaultList,
  ListProps as DefaultListProps,
  ListItem,
  Text,
  TextProps,
  ListItemProps,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import Badge, { BadgeProps } from '@/app/components/Shared/Badge';
import Card, { CardProps } from '@/app/components/Shared/Card';

interface ListProps extends DefaultListProps {
  title: string;
  subtitle?: string;
  badges?: BadgeProps[];
  action?: ReactNode;

  CardProps?: CardProps;
}

function List({
  title,
  subtitle,
  badges,
  action,
  children,
  CardProps,
  ...props
}: ListProps) {
  return (
    <Card {...CardProps}>
      <CardHeader>
        <Flex gap="0.75rem">
          {title && (
            <Heading fontSize="1.125rem" fontWeight={500} lineHeight={1.55556}>
              {title}
            </Heading>
          )}
          {badges &&
            badges?.map((badge, index) => (
              <Badge {...badge} key={index} rounded="6.25rem" mr="auto" />
            ))}
          {action}
        </Flex>
        {subtitle && (
          <Text fontSize="0.875rem" lineHeight={1.71429} color="#667085">
            {subtitle}
          </Text>
        )}
      </CardHeader>
      <CardBody>
        <DefaultList spacing={3} {...props}>
          {children}
        </DefaultList>
      </CardBody>
    </Card>
  );
}

const ItemTitle: FC<TextProps> = props => {
  return (
    <Text
      fontSize="0.875rem"
      fontWeight={500}
      lineHeight={1.42857}
      {...props}
    />
  );
};

const ItemSubtitle: FC<TextProps> = props => {
  return (
    <Text fontSize="0.75rem" fontWeight={400} lineHeight={1.5} {...props} />
  );
};

const Item: FC<ListItemProps> = props => {
  return <ListItem display="flex" gap="0.5rem" {...props} />;
};

List.Item = Item;
List.ItemTitle = ItemTitle;
List.ItemSubtitle = ItemSubtitle;

export default List;
