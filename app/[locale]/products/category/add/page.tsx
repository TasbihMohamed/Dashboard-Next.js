'use client';
import { COLORS } from '@/app/constant/UserDashboard';
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiSave } from 'react-icons/bi';
import { MdOutlineCancel } from 'react-icons/md';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useTranslations } from 'next-intl';
import Card from '@/app/components/Shared/Card';

const AddNewProduct = () => {
  const [isMobile] = useMediaQuery('(max-width:786px)');
  const { colorMode } = useColorMode();
  const [catImage] = useState<string | null>(null);
  const t = useTranslations('HomePage');

  return (
    <Stack
      gap={3}
      padding={'24px 12px'}
      height={'100hv'}
      backgroundColor={'E0E2E7'}
      overflow={'hidden'}
    >
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          <Text fontSize={isMobile ? '16px' : '24px'}>Products</Text>
          <Flex alignItems={'center'} display={'flex'} gap={0}>
            <Text
              fontSize={isMobile ? '8px' : '16px'}
              color={COLORS._primaryColor}
            >
              {t('Dashboard')}
            </Text>{' '}
            <RiArrowRightSLine />{' '}
            <Text
              fontSize={isMobile ? '8px' : '16px'}
              color={COLORS._primaryColor}
            >
              Category
            </Text>
            <RiArrowRightSLine />{' '}
            <Text fontSize={isMobile ? '8px' : '16px'} color={'gray.500'}>
              {t('Add Category')}
            </Text>
          </Flex>
        </Box>

        <Flex flexDirection={'row'} gap={2}>
          <Button
            ml={1}
            backgroundColor={'#fff'}
            aria-label="Select Dates"
            display={'flex'}
            alignItems={'center'}
          >
            <MdOutlineCancel
              color={colorMode === 'light' ? '' : COLORS._grayOne}
            />
            <Text
              ml={1}
              fontWeight={'semibold'}
              fontSize={'14px'}
              color={colorMode === 'light' ? '' : COLORS._grayOne}
            >
              {t('Cancel')}
            </Text>
          </Button>
          <Button
            ml={1}
            backgroundColor={COLORS._primaryColor}
            aria-label="Select Dates"
            display={'flex'}
            alignItems={'center'}
          >
            <BiSave color="#fff" />
            <Text
              ml={1}
              fontWeight={'semibold'}
              fontSize={'14px'}
              color={'#fff'}
            >
              {t('Save')}
            </Text>
          </Button>
        </Flex>
      </Flex>

      <Flex gap={5}>
        <Flex flexDirection={'column'} gap={2}>
          <Card padding={5} width={'100%'} borderRadius={8}>
            <Text fontWeight={'medium'} fontSize={18}>
              {t('Thumbnail')}
            </Text>
            <Text
              pt={3}
              pb={1}
              color={COLORS._grayOne}
              fontWeight={'medium'}
              fontSize={16}
            >
              {t('Photo')}
            </Text>
            <Flex
              backgroundColor={COLORS._lightBackground}
              flexDirection={'column'}
              align={'center'}
              gap={3}
              p={5}
            >
              {!catImage ? (
                <Box
                  width={!isMobile ? 44 : 5}
                  height={!isMobile ? 44 : 5}
                  borderRadius={8}
                  backgroundColor="#E0E2E7"
                ></Box>
              ) : (
                <Image
                  backgroundColor={'#E0E2E7'}
                  borderRadius={8}
                  width={100}
                  height={100}
                  objectFit="contain"
                  alt={`Image cat`}
                  src={'image.photoURL'}
                  transition={'0.4s'}
                  cursor={'pointer'}
                  _hover={{ filter: 'grayscale(60%)' }}
                  borderBottomRadius={0}
                />
              )}

              <Text color={'gray.400'}>
                {t('Drag and drop image here, or click add image')}
              </Text>
              <Input id="photoUploader" hidden type="file" accept="image/*" />
              <label htmlFor="photoUploader">
                <Box
                  padding={3}
                  cursor={'pointer'}
                  transition={'0.4s'}
                  borderRadius={5}
                  _hover={{ backgroundColor: COLORS._grayOne, color: '#fff' }}
                  color={COLORS._primaryColor}
                  backgroundColor={COLORS._lightSelected}
                  fontSize={14}
                  fontWeight={'bold'}
                >
                  {t('Change Image')}
                </Box>
              </label>
            </Flex>
          </Card>
        </Flex>
        <Card padding={5} width={'100%'} borderRadius={8}>
          <Text fontWeight={'medium'} fontSize={18}>
            {t('General Information')}
          </Text>
          <Box>
            <Text
              fontWeight={'medium'}
              mb={1}
              color={COLORS._grayOne}
              mt={5}
              fontSize={14}
            >
              {t('Category Name')}
            </Text>
            <Input
              backgroundColor={COLORS._lightBackground}
              type="text"
              placeholder="Watch"
              transition={'0.4s'}
            ></Input>
          </Box>
          <Box>
            <Text
              fontWeight={'medium'}
              mb={1}
              color={COLORS._grayOne}
              mt={5}
              fontSize={14}
            >
              {t('Description')}
            </Text>
            <Textarea
              transition={'0.4s'}
              backgroundColor={COLORS._lightBackground}
              minHeight={150}
              placeholder="Our range of watches are perfect whether you’re looking to upgrade."
            ></Textarea>
          </Box>
        </Card>
      </Flex>
    </Stack>
  );
};

export default AddNewProduct;
