'use client';
import { COLORS } from '@/app/constant/UserDashboard';
import {
  Box,
  Button,
  CardBody,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { GoFilter } from 'react-icons/go';
import Card from '@/app/components/Shared/Card';

import { Product } from '@/app/types/UserDashboard';
import { paginatePages } from '@/app/utils/helpers';
import { useState } from 'react';
import TableItem from './TableItem';
import { TranslationKey } from '@/app/types/withTranslation';

interface TopProductsTablePaginationProps {
  tableTitle: string;
  tableHeads: Array<string>;
  tableRows: Array<Product>;
  filterOperators: Array<string>;
  isFilter: boolean;
  tableWidth: string | number;
}

const TopProductsTablePagination = (props: TopProductsTablePaginationProps) => {
  const {
    filterOperators,
    isFilter,
    tableHeads,
    tableTitle,
    tableRows,
    tableWidth,
  } = props;
  const t = useTranslations('HomePage');
  const [currentPage, setCurrentPage] = useState(0);
  const { colorMode } = useColorMode();
  return (
    <Flex borderRadius={8} gap={5}>
      <Card
        backgroundColor={
          colorMode === 'dark' ? COLORS._darkBackground : 'white'
        }
        width={tableWidth}
      >
        <CardBody padding={0}>
          <Box
            p={5}
            margin={0}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Text fontWeight={'medium'} fontSize={18}>
              {t(tableTitle as TranslationKey<'HomePage'>)}
            </Text>
            {isFilter && (
              <Menu>
                <MenuButton as={Button} leftIcon={<GoFilter />}>
                  <Text ml={1} fontWeight={'semibold'} fontSize={'14px'}>
                    {t('Filters')}
                  </Text>
                </MenuButton>
                <MenuList>
                  {filterOperators.map(keyword => (
                    <MenuItem key={keyword}>
                      {t(keyword as TranslationKey<'HomePage'>)}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            )}
          </Box>
          <TableContainer mt={2} p={0}>
            <Table p={0} variant="simple">
              <Thead>
                <Tr mt={5} p={10}>
                  {tableHeads.map(tableHeads => (
                    <Th
                      key={tableHeads}
                      fontSize={14}
                      fontWeight={'medium'}
                      textTransform={'unset'}
                    >
                      <Text fontWeight="500">
                        {t(
                          tableHeads as TranslationKey<'HomePage'>,
                        ).toUpperCase()}
                      </Text>
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {paginatePages<Product>(tableRows, currentPage, 3).map(
                  product => (
                    <TableItem product={product} key={product.name} />
                  ),
                )}
              </Tbody>
            </Table>
            <Divider />
            <Flex gap={5} p={5}>
              {Array.from(Array(Math.ceil(tableRows.length / 3)).keys()).map(
                pang => (
                  <Button
                    key={pang}
                    backgroundColor={COLORS._primaryColor}
                    color={'#fff'}
                    onClick={() => setCurrentPage(pang)}
                  >
                    {pang + 1}
                  </Button>
                ),
              )}
            </Flex>
          </TableContainer>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default TopProductsTablePagination;
