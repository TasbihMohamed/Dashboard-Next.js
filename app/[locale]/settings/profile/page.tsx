'use client';
import { COLORS } from '@/app/constant/UserDashboard';
import { RootState } from '@/app/store/store';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  InputRightElement,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BiSave } from 'react-icons/bi';
import { MdOutlineCancel } from 'react-icons/md';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { TextField } from '@/app/components/Shared/Inputs/TextField';
import { LuBadgeAlert } from 'react-icons/lu';
import Card from '@/app/components/Shared/Card';

const validationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  address: yup.object({
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    postalCode: yup.string().required('Postal code is required'),
    country: yup.string().required('Country is required'),
  }),
});

const Profile = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { colorMode } = useColorMode();
  const [updatedAlert, setUpdatedAlert] = useState(false);
  const userData = useSelector((state: RootState) => state.UserData.data);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const t = useTranslations('HomePage');
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: userData?.firstName ?? '',
      lastName: userData?.lastName ?? '',
      phoneNumber: userData?.phoneNumber ?? '',
      password: '',
      confirmPassword: '',
      address: {
        street: userData?.address.street ?? '',
        city: userData?.address.city ?? '',
        state: userData?.address.state ?? '',
        postalCode: userData?.address.postalCode ?? '',
        country: userData?.address.country ?? '',
      },
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async payload => {
      const request = await fetch('/api/users/update', {
        body: JSON.stringify({
          userId: userData?._id,
          payload,
        }),
        method: 'POST',
      });
      const response = await request.json();
      if (response.success) setUpdatedAlert(true);
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUpdatedAlert(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [updatedAlert]);

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

          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Box>
              <Text fontSize={isMobile ? '16px' : '24px'}>{t('Profile')}</Text>
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
                  {t('Settings')}
                </Text>
                <RiArrowRightSLine />
                <Text fontSize={isMobile ? '8px' : '16px'} color={'gray.500'}>
                  {t('User Account')}
                </Text>
              </Flex>
            </Box>
            <Flex flexDirection={'row'} gap={2}>
              <Button
                onClick={() => router.refresh()}
                ml={1}
                backgroundColor={'#fff'}
                aria-label="Select Dates"
                display={'flex'}
                alignItems={'center'}
                type="button"
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
                backgroundColor={
                  formik.dirty ? COLORS._primaryColor : COLORS._grayOne
                }
                _hover={{
                  backgroundColor: formik.dirty
                    ? COLORS._primaryColor
                    : COLORS._grayOne,
                }}
                isDisabled={!formik.dirty || !formik.isValid}
                aria-label="Select Dates"
                display={'flex'}
                alignItems={'center'}
                type="submit"
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
            <Card padding={5} width={'100%'} borderRadius={8}>
              <Text fontWeight={'medium'} fontSize={18}>
                {t('Thumbnail')}
              </Text>

              <SimpleGrid gap={5} mt={5}>
                <TextField
                  namespace="HomePage"
                  label="First Name"
                  placeholder="John"
                  backgroundColor={COLORS._lightBackground}
                  transition={'0.4s'}
                  {...formik.getFieldProps('firstName')}
                  errorMessage={
                    (formik.touched?.firstName &&
                      formik.errors?.firstName) as string
                  }
                  multiline
                />

                <TextField
                  namespace="HomePage"
                  label="Last Name"
                  placeholder="Doe"
                  backgroundColor={COLORS._lightBackground}
                  transition={'0.4s'}
                  {...formik.getFieldProps('lastName')}
                  errorMessage={
                    (formik.touched?.lastName &&
                      formik.errors?.lastName) as string
                  }
                />

                <TextField
                  namespace="HomePage"
                  label="Email"
                  placeholder="email_placeholder"
                  isReadOnly
                  isDisabled
                  type="email"
                  backgroundColor={COLORS._lightBackground}
                  transition={'0.4s'}
                  {...formik.getFieldProps('email')}
                />

                <TextField
                  namespace="HomePage"
                  label="Password"
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  rightIcon={
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        px="4px"
                        onClick={() =>
                          setShowPassword(showPassword => !showPassword)
                        }
                      >
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </Button>
                    </InputRightElement>
                  }
                  {...formik.getFieldProps('password')}
                  errorMessage={
                    (formik.touched?.password &&
                      formik.errors?.password) as string
                  }
                />

                <TextField
                  namespace="HomePage"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  rightIcon={
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        px="4px"
                        onClick={() =>
                          setShowConfirmPassword(showPassword => !showPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <AiFillEyeInvisible />
                        ) : (
                          <AiFillEye />
                        )}
                      </Button>
                    </InputRightElement>
                  }
                  errorMessage={
                    (formik.touched?.confirmPassword &&
                      formik.errors?.confirmPassword) as string
                  }
                  {...formik.getFieldProps('confirmPassword')}
                />

                <TextField
                  namespace="HomePage"
                  label="Phone Number"
                  backgroundColor={COLORS._lightBackground}
                  placeholder="+45 00 00000"
                  transition={'0.4s'}
                  {...formik.getFieldProps('phoneNumber')}
                  errorMessage={
                    (formik.touched?.phoneNumber &&
                      formik.errors?.phoneNumber) as string
                  }
                />

                <TextField
                  namespace="HomePage"
                  label="Street"
                  backgroundColor={COLORS._lightBackground}
                  placeholder="1 Jhon Stam St"
                  transition={'0.4s'}
                  {...formik.getFieldProps('address.street')}
                  errorMessage={
                    (formik.touched.address?.street &&
                      formik.errors.address?.street) as string
                  }
                />

                <TextField
                  namespace="HomePage"
                  label="City"
                  backgroundColor={COLORS._lightBackground}
                  placeholder="Give"
                  transition={'0.4s'}
                  {...formik.getFieldProps('address.city')}
                  errorMessage={
                    (formik.touched.address?.city &&
                      formik.errors.address?.city) as string
                  }
                />

                <TextField
                  namespace="HomePage"
                  label="State"
                  backgroundColor={COLORS._lightBackground}
                  placeholder="Copenhagen"
                  transition={'0.4s'}
                  {...formik.getFieldProps('address.state')}
                  errorMessage={
                    (formik.touched.address?.state &&
                      formik.errors.address?.state) as string
                  }
                />

                <TextField
                  namespace="HomePage"
                  label="Postal"
                  backgroundColor={COLORS._lightBackground}
                  placeholder="85596"
                  transition={'0.4s'}
                  {...formik.getFieldProps('address.postalCode')}
                  errorMessage={
                    (formik.touched.address?.postalCode &&
                      formik.errors.address?.postalCode) as string
                  }
                />

                <SimpleGrid gap={2}>
                  <Text
                    fontWeight={'medium'}
                    mb={1}
                    color={COLORS._grayOne}
                    fontSize={14}
                  >
                    {t('Country')}
                  </Text>
                  <Select
                    placeholder="Select a country"
                    {...formik.getFieldProps('address.country')}
                  >
                    <option>Denmark</option>
                    <option>Germeny</option>
                    <option>Finland</option>
                    <option>Sweden</option>
                    <option>Norway</option>
                  </Select>
                  {formik.touched?.address?.country &&
                    formik.errors?.address?.country && (
                      <Box
                        display="flex"
                        gap={2}
                        alignItems="center"
                        color="red.500"
                      >
                        <LuBadgeAlert />
                        {formik.errors?.address?.country as string}
                      </Box>
                    )}
                </SimpleGrid>
              </SimpleGrid>
            </Card>
          </Flex>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default Profile;
