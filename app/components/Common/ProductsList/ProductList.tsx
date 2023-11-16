'use client';
import { Product } from '@/app/types/UserDashboard';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  useColorMode,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { AiOutlineEye } from 'react-icons/ai';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { GoFilter } from 'react-icons/go';
import CustomTableHead from '@/app/components/Common/CustomTableHead';
import { TranslationKey } from '@/app/types/withTranslation';
import { useEffect, useRef, useState } from 'react';
import DeleteDialog from '@/app/components/Common/ProductsList/DeleteDialog';
import { useDisclosure } from '@chakra-ui/hooks';
import Card from '@/app/components/Shared/Card';
import IconButton from '@/app/components/Shared/IconButton';
import { COLORS } from '@/app/constant/UserDashboard';

const filters = [
  'Price',
  'High Sales',
  'Low Stock',
  'High Stock',
  'Out Of Stock',
];

const headCells = [
  'Product',
  'SKU',
  'Category',
  'Stock',
  'Price',
  'Status',
  'Added',
  'Action',
];

const StatusColors: Record<string, { background: string; color: string }> = {
  LowStock: {
    background: '#FEEDEC',
    color: '#F81E6E',
  },
  HighStock: {
    background: '#FEEDEC',
    color: '#F81E6E',
  },
};

interface ProductListProps {
  searchKeyWord: string;
}

const ProductList = (props: ProductListProps) => {
  const t = useTranslations('HomePage');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const dialogProps = useDisclosure();
  const productToBeDeletedRef = useRef<string | null>(null);
  const { colorMode } = useColorMode();
  const router = useRouter();
  const { searchKeyWord } = props;

  useEffect(() => {
    setLoading(true);
    fetch('/api/products', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          '_shoptak-user-session',
        )}`,
      },
    })
      .then(resp => resp.json())
      .then((products: Product[]) =>
        setProducts(
          products.map(product => ({
            ...product,
            status: 'LowStock',
            createdAt: new Date(),
          })),
        ),
      )
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Text>loading...</Text>;

  const filteredProducts = products.filter(
    product =>
      product.name.toLowerCase().includes(searchKeyWord.toLowerCase()) ||
      product.sku
        .toString()
        .toLowerCase()
        .includes(searchKeyWord.toString().toLowerCase()),
  );

  return (
    <Card
      backgroundColor={colorMode === 'dark' ? COLORS._darkBackground : 'white'}
      position="relative"
    >
      <Flex padding={5} alignItems="center" justifyContent="space-between">
        <Flex gap={2} alignItems="center">
          <Text height="fit-content" fontWeight="500" fontSize={18}>
            {t('Products')}
          </Text>
        </Flex>
        <Flex gap={5}>
          <Menu>
            <MenuButton as={Button} leftIcon={<GoFilter />}>
              <Text ml={1} fontWeight="semibold" fontSize={{ base: 8, md: 14 }}>
                {t('Filters')}
              </Text>
            </MenuButton>
            <MenuList>
              {filters.map(keyword => (
                <MenuItem key={keyword}>
                  {t(keyword as TranslationKey<'HomePage'>)}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <TableContainer transition="0.4s" mt={2} p={0}>
        <Table transition="0.4s" p={0} variant="simple" fontFamily="Inter">
          <CustomTableHead headCells={headCells} />
          <Tbody transition="0.4s">
            {filteredProducts.map((product: Product) => (
              <Tr transition="0.4s" key={product.name}>
                <Td width={{ base: 20, md: 50 }} paddingLeft={5}>
                  <Flex gap={{ base: 1, md: 8 }}>
                    <Checkbox />

                    <Box
                      width={{ base: 5, md: '44px' }}
                      height={{ base: 5, md: '44px' }}
                      borderRadius={8}
                      backgroundColor="#E0E2E7"
                    />

                    <Flex flexDirection="column" justifyContent="space-around">
                      <Text
                        width="10ch"
                        overflow="hidden"
                        fontSize={{ base: 8, md: 14 }}
                        textOverflow="ellipsis"
                      >
                        {product.name}
                      </Text>
                    </Flex>
                  </Flex>
                </Td>
                <Td width={{ base: 20, md: 50 }} padding={0}>
                  <Text
                    textAlign="center"
                    padding={1}
                    fontSize={{ base: 8, md: 14 }}
                  >
                    {product.sku}
                  </Text>
                </Td>
                <Td width={{ base: 20, md: 50 }} padding={3}>
                  <Flex flexDirection="column" gap="4px">
                    <Text
                      padding={1}
                      textAlign="center"
                      width="30 ch"
                      overflow="hidden"
                      fontSize={{ base: 8, md: 14 }}
                      textOverflow="ellipsis"
                    >
                      {product.category?.name ?? 'N/A'}
                    </Text>
                  </Flex>
                </Td>
                <Td textAlign="center">
                  <Text textAlign="center" fontSize={{ base: 8, md: 14 }}>
                    {product.stockQuantity}
                  </Text>
                </Td>
                <Td padding={0}>
                  <Text textAlign="center" fontSize={{ base: 8, md: 14 }}>
                    {product.price}
                  </Text>
                </Td>
                <Td padding={0}>
                  <Text
                    width="fit-content"
                    height="fit-content"
                    mx="auto"
                    fontSize={{ base: 8, md: 14 }}
                    padding="4px 12px"
                    borderRadius="20px"
                    textAlign="center"
                    backgroundColor={StatusColors[product.status].background}
                    color={StatusColors[product.status].color}
                  >
                    {product.status}
                  </Text>
                </Td>
                <Td padding={0}>
                  <Text
                    textAlign="center"
                    height="fit-content"
                    fontSize={{ base: 8, md: 14 }}
                    padding="4px 12px"
                    borderRadius="20px"
                  >
                    {product.createdAt.toLocaleDateString()}
                  </Text>
                </Td>
                <Td width={{ base: 20, md: 50 }} textAlign="center" padding={0}>
                  <Flex>
                    <IconButton
                      backgroundColor="transparent"
                      aria-label="edit"
                      icon={<BiTrash />}
                      onClick={() => {
                        productToBeDeletedRef.current = product.id;
                        return dialogProps.onOpen();
                      }}
                    />
                    <IconButton
                      backgroundColor="transparent"
                      aria-label="edit"
                      icon={<BiPencil />}
                      onClick={() => {
                        router.push(`/products/${product.id}/edit`);
                      }}
                    />
                    <IconButton
                      backgroundColor="transparent"
                      aria-label="preview"
                      icon={<AiOutlineEye />}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}

            {filteredProducts.length < 1 ? (
              <Text paddingTop={5} paddingBottom={5} textAlign="center">
                0 {t('Results Found')}
              </Text>
            ) : (
              ''
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <DeleteDialog
        {...dialogProps}
        onDelete={async () => {
          try {
            await fetch(`/api/products/${productToBeDeletedRef.current}`, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  '_shoptak-user-session',
                )}`,
              },
            });
            setProducts(product =>
              product.filter(({ id }) => id !== productToBeDeletedRef.current),
            );
          } catch (error) {
            console.warn(error);
          }
        }}
      />
    </Card>
  );
};

export default ProductList;
