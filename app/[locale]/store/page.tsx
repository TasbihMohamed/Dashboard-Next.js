'use client';
import { DomainsList } from '@/app/components/Common/Domains/Domains';
import { TextField } from '@/app/components/Shared/Inputs/TextField';
import { COLORS } from '@/app/constant/UserDashboard';
import { RootState } from '@/app/store/store';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  AiOutlineCreditCard,
  AiOutlineFormatPainter,
  AiOutlineTeam,
} from 'react-icons/ai';
import { BiSave, BiWorld } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { HiOutlineReceiptTax } from 'react-icons/hi';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { RiArrowRightSLine } from 'react-icons/ri';
import { TbSeo } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import Card from '@/app/components/Shared/Card';

const validationSchema = yup.object({
  storeName: yup.string().required('Store name is required'),
  storeDescription: yup.string().required('Store description is required'),
});

const Store = () => {
  const t = useTranslations('HomePage');
  const [updatedAlert, setUpdatedAlert] = useState(false);
  const storeData = useSelector((state: RootState) => state.storeData.data);

  const router = useRouter();
  interface storeSettingsCardsType {
    route: string;
    tilte: string;
    descripiton: string;
    icon: React.ReactElement;
  }

  const storeSettingsCards: storeSettingsCardsType[] = [
    {
      route: '/store/payments',
      tilte: 'Payment Methods',
      descripiton:
        'Here you can manage your stores payment services and allow customers to pay using the available payment methods',
      icon: <AiOutlineCreditCard size={50} color={COLORS._primaryColor} />,
    },
    {
      route: '/store/shipping',
      tilte: 'Shipping',
      descripiton:
        'Managing shipping methods for products and controlling shipping operations',
      icon: <LiaShippingFastSolid size={50} color={COLORS._primaryColor} />,
    },
    {
      route: '/store/styling',
      tilte: 'Store Style',
      descripiton:
        'Need to change and customize the theme and appearance of the site',
      icon: <AiOutlineFormatPainter size={50} color={COLORS._primaryColor} />,
    },
    {
      route: '/store/tax',
      tilte: 'Taxes',
      descripiton: 'VAT fees and other fees that are applied to products',
      icon: <HiOutlineReceiptTax size={50} color={COLORS._primaryColor} />,
    },
    {
      route: '/store/teamwork',
      tilte: 'Team Work',
      descripiton:
        'Do you have a team of developers and vendors? You can add them now',
      icon: <AiOutlineTeam size={50} color={COLORS._primaryColor} />,
    },
    {
      route: '/store/domains',
      tilte: 'Domains',
      descripiton: 'Controlling domains and linking external domains',
      icon: <BiWorld size={50} color={COLORS._primaryColor} />,
    },
    {
      route: '/store/seo',
      tilte: 'SEO',
      descripiton:
        'Search engine optimization and work to improve the appearance of your page on the first pages',
      icon: <TbSeo size={50} color={COLORS._primaryColor} />,
    },
    {
      route: '/store/settings',
      tilte: 'General Settings',
      descripiton: 'Other settings, disable general actions',
      icon: <FiSettings size={50} color={COLORS._primaryColor} />,
    },
  ];

  const formik = useFormik({
    initialValues: {
      storeName: storeData?.storeName ?? '',
      storeDescription: storeData?.storeDescription ?? '',
      storeLogo: storeData?.storeLogo ?? '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async payload => {
      const request = await fetch('/api/stores/update', {
        body: JSON.stringify(payload),
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            '_shoptak-user-session',
          )}`,
        },
      });
      const response = await request.json();
      if (response.status == 200) setUpdatedAlert(true);
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <Stack
          gap={3}
          padding={'24px 12px'}
          height={'100hv'}
          backgroundColor={'E0E2E7'}
          overflow={'hidden'}
        >
          {updatedAlert && (
            <Alert transition={'0.4s'} status="success">
              <AlertIcon />
              {t('Profile updated!')}
            </Alert>
          )}
          <Stack>
            <Flex align={'center'} justify={'space-between'} gap={8}>
              <Box>
                <Text fontSize={'24px'}>{t('Store')}</Text>
                <Flex alignItems={'center'} display={'flex'} gap={0}>
                  <Text fontSize={'16px'} color={COLORS._primaryColor}>
                    {t('Store')}
                  </Text>{' '}
                  <RiArrowRightSLine />{' '}
                  <Text fontSize={'16px'} color={'gray.500'}>
                    {t('Store Information')}
                  </Text>
                </Flex>
              </Box>
              <Flex flexDirection={'row'} gap={2}>
                <Button
                  ml={1}
                  backgroundColor={
                    formik.dirty ? COLORS._primaryColor : COLORS._grayOne
                  }
                  _hover={{
                    backgroundColor: formik.dirty
                      ? COLORS._primaryColor
                      : COLORS._grayOne,
                  }}
                  isDisabled={!formik.dirty || !formik.isValid}
                  aria-label="Save"
                  display={'flex'}
                  alignItems={'center'}
                  type="submit"
                >
                  <Text
                    ml={1}
                    fontWeight={'semibold'}
                    fontSize={'14px'}
                    color={'#fff'}
                  >
                    {t('Save')}
                  </Text>
                  <BiSave color="#fff" />
                </Button>
              </Flex>
            </Flex>
            <Card padding={5} width={'100%'} borderRadius={8}>
              <Text fontWeight={'medium'} fontSize={18}>
                {t('Store Information')}
              </Text>
              <Text
                fontWeight={'medium'}
                mb={1}
                color={COLORS._grayOne}
                mt={5}
                fontSize={14}
              >
                Logo
              </Text>

              <Button
                mb={2}
                transition={'0.4s'}
                cursor={'pointer'}
                p={10}
                _hover={{ backgroundColor: COLORS._grayOne }}
              >
                <Image
                  src="/logo.png"
                  alt="store photo"
                  width={190}
                  height={38}
                />
              </Button>
              <SimpleGrid gap={5} mt={5}>
                <TextField
                  namespace="HomePage"
                  label="Store Name"
                  placeholder="Store Name"
                  type="text"
                  backgroundColor={COLORS._lightBackground}
                  transition={'0.4s'}
                  {...formik.getFieldProps('storeName')}
                  errorMessage={
                    (formik.touched?.storeName &&
                      formik.errors?.storeName) as string
                  }
                />
                <TextField
                  namespace="HomePage"
                  label="Description"
                  placeholder="Description"
                  type="text"
                  backgroundColor={COLORS._lightBackground}
                  transition={'0.4s'}
                  {...formik.getFieldProps('storeDescription')}
                  errorMessage={
                    (formik.touched?.storeDescription &&
                      formik.errors?.storeDescription) as string
                  }
                />
                <DomainsList />
              </SimpleGrid>
            </Card>
          </Stack>
          <Card>
            <Flex flexWrap={'wrap'} align={'center'} justify={'center'}>
              {storeSettingsCards.map(settings => (
                <Card
                  onClick={() => router.replace(settings.route)}
                  key={settings.tilte}
                  m={5}
                  transition={'0.4s'}
                  _hover={{
                    boxShadow: '-1px 3px 20px 0px #80808047',
                    filter: 'grayscale(1)',
                  }}
                  textAlign={'center'}
                  cursor={'pointer'}
                  display={'flex'}
                  flexDirection={'column'}
                  align={'center'}
                  p={5}
                  width={250}
                  backgroundColor={'transparent'}
                >
                  <Box w={50}>{settings.icon}</Box>
                  <Text color={COLORS._primaryColor} fontWeight={'semibold'}>
                    {t(settings.tilte as any)}
                  </Text>
                  <Text
                    height={70}
                    color={COLORS._grayOne}
                    fontSize={12}
                    fontWeight={'semibold'}
                  >
                    {t(settings.descripiton as any)}
                  </Text>
                </Card>
              ))}
            </Flex>
          </Card>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default Store;
