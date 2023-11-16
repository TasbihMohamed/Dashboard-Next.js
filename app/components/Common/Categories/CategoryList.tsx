'use client';
import { COLORS, Categories } from '@/app/constant/UserDashboard';
import { Category } from '@/app/types/UserDashboard';
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
  useMediaQuery,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { AiOutlineEye, AiOutlinePlus } from 'react-icons/ai';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { GoFilter } from 'react-icons/go';
import CustomTableHead from '@/app/components/Common/CustomTableHead';
import { TranslationKey } from '@/app/types/withTranslation';
import Card from '@/app/components/Shared/Card';
import IconButton from '@/app/components/Shared/IconButton';

const filters = ['High Sales', 'Low Stock', 'Date'];

const headCells = ['Category', 'Sales', 'Stock', 'Added', 'Action'];

interface CategoryListProps {
  searchKeyWord: string;
}

const CategoryList = (props: CategoryListProps) => {
  const t = useTranslations('HomePage');
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const router = useRouter();

  const { searchKeyWord } = props;

  return (
    <Card position={'relative'}>
      <Flex padding={5} alignItems={'center'} justifyContent="space-between">
        <Flex gap={2} alignItems={'center'}>
          <Text height="fit-content" fontWeight="500" fontSize={18}>
            {t('Category')}
          </Text>
        </Flex>
        <Flex gap={5}>
          <Menu>
            <MenuButton as={Button} leftIcon={<GoFilter />}>
              <Text
                ml={1}
                fontWeight={'semibold'}
                fontSize={!isMobile ? 14 : 8}
              >
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
          <Button
            onClick={() => router.replace('/products/category/add')}
            ml={1}
            backgroundColor={COLORS._primaryColor}
            aria-label="Select Dates"
          >
            <AiOutlinePlus color="#fff" />
            <Text
              ml={1}
              fontWeight={'semibold'}
              fontSize={'14px'}
              color={'#fff'}
            >
              {t('Add Category')}
            </Text>
          </Button>
        </Flex>
      </Flex>
      <TableContainer transition={'0.4s'} mt={2} p={0}>
        <Table transition={'0.4s'} p={0} variant="simple" fontFamily="Inter">
          <CustomTableHead headCells={headCells} />
          <Tbody transition={'0.4s'}>
            {Categories.filter((category: Category) =>
              category.title
                .toLowerCase()
                .includes(searchKeyWord.toLowerCase()),
            ).map((category: Category) => (
              <Tr transition={'0.4s'} key={category.title}>
                <Td width={isMobile ? 20 : 50} paddingLeft={5}>
                  <Flex gap={!isMobile ? 8 : 1}>
                    <Checkbox />

                    <Box
                      width={!isMobile ? '44px' : 5}
                      height={!isMobile ? '44px' : 5}
                      borderRadius={8}
                      backgroundColor="#E0E2E7"
                    ></Box>
                    <Flex flexDirection="column" justifyContent="space-around">
                      <Text fontSize={!isMobile ? 14 : 8}>
                        {category.title}
                      </Text>
                    </Flex>
                  </Flex>
                </Td>
                <Td width={isMobile ? 20 : 50} padding={0}>
                  <Text
                    textAlign={'center'}
                    padding={1}
                    fontSize={!isMobile ? 14 : 8}
                  >
                    {category.sales}
                  </Text>
                </Td>
                <Td width={isMobile ? 20 : 50} padding={0}>
                  <Text
                    textAlign={'center'}
                    padding={1}
                    fontSize={!isMobile ? 14 : 8}
                  >
                    {category.stock}
                  </Text>
                </Td>
                <Td width={isMobile ? 20 : 50} padding={0}>
                  <Text
                    textAlign={'center'}
                    padding={1}
                    fontSize={!isMobile ? 14 : 8}
                  >
                    {category.added.toLocaleDateString()}
                  </Text>
                </Td>

                <Td width={isMobile ? 20 : 50} textAlign={'center'} padding={0}>
                  <IconButton
                    backgroundColor="transparent"
                    aria-label="edit"
                    icon={<BiTrash />}
                  />
                  <IconButton
                    backgroundColor="transparent"
                    aria-label="edit"
                    icon={<BiPencil />}
                  />
                  <IconButton
                    backgroundColor="transparent"
                    aria-label="preview"
                    icon={<AiOutlineEye />}
                  />
                </Td>
              </Tr>
            ))}

            {Categories.filter((category: Category) =>
              category.title
                .toLowerCase()
                .includes(searchKeyWord.toLowerCase()),
            ).length < 1 ? (
              <Text paddingTop={5} paddingBottom={5} textAlign={'center'}>
                0 {t('Results Found')}
              </Text>
            ) : (
              ''
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default CategoryList;
