import { COLORS } from '@/app/constant/UserDashboard';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  SimpleGrid,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiSave } from 'react-icons/bi';
import { HiMiniXMark } from 'react-icons/hi2';
import { useTranslations } from 'next-intl';
import BreadcrumbNavigation from '@/app/components/Shared/BreadcrumbNavigation';
import {
  FieldArray,
  Form,
  FormikHelpers,
  FormikProvider,
  useFormik,
} from 'formik';
import {
  productValidationSchema,
  ProductValidationSchemaType,
} from '@/app/validation/products';
import { SelectInput } from '@/app/components/Shared/Inputs/SelectInput';
import { StatusColors } from '@/app/constant/StatusColors';
import { MdOutlineCancel } from 'react-icons/md';
import { TranslationKey } from '@/app/types/withTranslation';
import DropZone from '@/app/components/Common/DropZone';
import { TextField } from '@/app/components/Shared/Inputs/TextField';
import { useRouter } from 'next/navigation';
import Card from '@/app/components/Shared/Card';
import useCategories from '@/app/utils/hooks/useCategories';

type ProductFormProps = {
  initialValues: ProductValidationSchemaType;
  onSubmit: (_formData: FormData) => Promise<void>;
  title: TranslationKey<'HomePage'>;
  submitButtonText?: TranslationKey<'HomePage'>;
  onResetForm?: (_helpers: FormikHelpers<ProductValidationSchemaType>) => void;
};

const ProductForm = ({
  title,
  initialValues,
  onSubmit,
  submitButtonText,
  onResetForm,
}: ProductFormProps) => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const t = useTranslations('HomePage');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<Array<string>>(initialValues.tag ?? []);
  const { categories } = useCategories();

  const formik = useFormik({
    initialValues,
    validationSchema: productValidationSchema,
    async onSubmit(values, helpers) {
      try {
        helpers.setSubmitting(true);
        const formData = new FormData();
        const entries = Object.entries(values);
        for (const [name, value] of entries) {
          if (!['image', 'tag', 'variation'].includes(name))
            formData.append(name, value as string);
          else {
            for (const file of value as (File | string)[]) {
              formData.append(name, file);
            }
          }
        }

        await onSubmit(formData);

        if (onResetForm) {
          onResetForm(helpers);
          setTags([]);
        }
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  const handleAddTags = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tag.trim().length < 3) {
      return formik.setFieldError('tag', 'Tag should be at least 3 characters');
    }

    if (e.key === 'Enter') {
      const newArrayFiltered = [...tags, tag];
      await formik.setFieldValue('tag', newArrayFiltered);
      setTags(newArrayFiltered);
      setTag('');
    }
  };

  const removeTag = async (index: number) => {
    const newArr = [...tags];
    newArr.splice(index, 1);
    await formik.setFieldValue('tag', newArr);
    setTags(newArr);
  };

  const getInputProps = (name: keyof ProductValidationSchemaType) => {
    return {
      ...formik.getFieldProps(name),
      errorMessage: (formik.touched[name] && formik.errors[name]) as string,
    };
  };

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <Stack
          gap={3}
          padding="24px 24px"
          pl="32px"
          height="100hv"
          backgroundColor="E0E2E7"
          overflow="hidden"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <BreadcrumbNavigation
              title={t(title)}
              items={[
                { label: t('Dashboard'), link: '/' },
                { label: t('Product List'), link: '/products' },
                { label: t(title), link: '#' },
              ]}
            />

            <Flex flexDirection="row" gap={3}>
              <Button
                backgroundColor="#fff"
                aria-label="Cancel changes"
                display="flex"
                alignItems="center"
                leftIcon={
                  <MdOutlineCancel
                    color={colorMode === 'light' ? '' : COLORS._grayOne}
                  />
                }
                onClick={() => {
                  return router.push('/products');
                }}
              >
                <Text
                  fontWeight="semibold"
                  fontSize="14px"
                  color={colorMode === 'light' ? '' : COLORS._grayOne}
                >
                  {t('Cancel')}
                </Text>
              </Button>
              <Button
                backgroundColor={COLORS._primaryColor}
                aria-label="Add Product"
                display="flex"
                alignItems="center"
                type="submit"
                leftIcon={<BiSave color="#fff" />}
                isDisabled={!formik.dirty || formik.isSubmitting}
                isLoading={formik.isSubmitting}
                _hover={{
                  background: COLORS._primaryColor100,
                }}
              >
                <Text fontWeight="semibold" fontSize="14px" color="#fff">
                  {t(submitButtonText ?? 'Add Product')}
                </Text>
              </Button>
            </Flex>
          </Flex>

          <SimpleGrid gap="1.5rem" gridTemplateColumns={{ xl: '1fr auto' }}>
            <SimpleGrid gap="1.5rem">
              <Card
                padding={5}
                width="100%"
                borderRadius={8}
                display="grid"
                gap="0.88rem"
              >
                <Text fontWeight="medium" fontSize={18}>
                  {t('General Information')}
                </Text>

                <TextField
                  namespace="HomePage"
                  label="Name"
                  backgroundColor={COLORS._lightBackground}
                  placeholder="product_name_placeholder"
                  transition="0.4s"
                  {...getInputProps('name')}
                />

                <TextField
                  namespace="HomePage"
                  multiline
                  label="Description"
                  transition="0.4s"
                  backgroundColor={COLORS._lightBackground}
                  placeholder="product_description_placeholder"
                  rows={7}
                  {...getInputProps('description')}
                />
              </Card>

              <Card padding={5} width="100%" borderRadius={8}>
                <Text fontWeight="medium" fontSize={18}>
                  {t('Media')}
                </Text>

                {/* TODO media */}
                <DropZone
                  label="Photo"
                  subtitle={t('image_upload_description')}
                  buttonText={t('add_image_label')}
                  errorMessage={
                    (formik.touched.image && formik.errors.image) as string
                  }
                  onUpload={files => {
                    return formik.setFieldValue('image', files);
                  }}
                />
              </Card>

              <Card
                padding={5}
                width="100%"
                borderRadius={8}
                display="grid"
                gap="0.88rem"
              >
                <Text fontWeight="medium" fontSize={18}>
                  {t('Pricing')}
                </Text>

                <TextField
                  namespace="HomePage"
                  label="Base Price"
                  borderRadius={8}
                  type="number"
                  placeholder="price_description"
                  backgroundColor={COLORS._lightBackground}
                  transition="0.4s"
                  pl="40px"
                  leftIcon={
                    <Box
                      zIndex={1}
                      left="18.5px"
                      bottom={2}
                      position="absolute"
                    >
                      <Text>$</Text>
                    </Box>
                  }
                  {...getInputProps('price')}
                />

                <Flex gap="0.88rem">
                  <SelectInput
                    backgroundColor={COLORS._lightBackground}
                    label="Discount"
                    variant="outline"
                    placeholder="No Discount"
                    {...getInputProps('discount')}
                  >
                    <option value="One">{t('Discount 25%')}</option>
                    <option value="One">{t('Discount 15%')}</option>
                    <option value="One">{t('Discount 85%')}</option>
                    <option value="One">{t('Black Friday')}</option>
                  </SelectInput>

                  <TextField
                    namespace="HomePage"
                    label="discount_percentage_label"
                    borderRadius={8}
                    type="number"
                    min={0}
                    max={100}
                    placeholder="0"
                    backgroundColor={COLORS._lightBackground}
                    transition="0.4s"
                    {...getInputProps('discountPercentage')}
                  />
                </Flex>

                <Flex gap="0.88rem">
                  <SelectInput
                    backgroundColor={COLORS._lightBackground}
                    label="Tax Class"
                    variant="outline"
                    placeholder="No Discount"
                    {...getInputProps('tax')}
                  >
                    <option value="One">{t('Tax Free')}</option>
                  </SelectInput>

                  <TextField
                    namespace="HomePage"
                    label="vat_amount_label"
                    borderRadius={8}
                    placeholder="0"
                    type="number"
                    backgroundColor={COLORS._lightBackground}
                    transition="0.4s"
                    {...getInputProps('vatAmount')}
                  />
                </Flex>
              </Card>

              <Card
                padding={5}
                width="100%"
                borderRadius={8}
                display="grid"
                gap="0.88rem"
              >
                <Text fontWeight="medium" fontSize={18}>
                  {t('Inventory')}
                </Text>
                <Flex gap={3}>
                  <TextField
                    namespace="HomePage"
                    label="SKU"
                    backgroundColor={COLORS._lightBackground}
                    type="text"
                    placeholder="product_sku_placeholder"
                    transition="0.4s"
                    {...getInputProps('sku')}
                  />

                  <TextField
                    namespace="HomePage"
                    label="Barcode"
                    backgroundColor={COLORS._lightBackground}
                    type="text"
                    placeholder="product_barcode_placeholder"
                    transition="0.4s"
                    {...getInputProps('barcode')}
                  />

                  <TextField
                    namespace="HomePage"
                    label="Quantity"
                    backgroundColor={COLORS._lightBackground}
                    type="number"
                    placeholder="quantity_placeholder"
                    transition="0.4s"
                    {...getInputProps('stock')}
                  />
                </Flex>
              </Card>

              <Card
                padding={5}
                width="100%"
                borderRadius={8}
                display="grid"
                gap="0.88rem"
              >
                <Text fontWeight="medium" fontSize={18}>
                  {t('Variation')}t{''}
                </Text>
                <FieldArray
                  name="variation"
                  render={arrayHelpers => (
                    <>
                      {formik.values.variation?.map((_, index) => (
                        <Flex gap="0.88rem" key={+index}>
                          <SelectInput
                            placeholder="Select a variation"
                            label="Variation Type"
                            {...formik.getFieldProps(`variation.${index}.type`)}
                            errorMessage={
                              ((
                                formik.touched
                                  ?.variation as ProductValidationSchemaType['variation']
                              )?.[index]?.type &&
                                (
                                  formik.errors
                                    ?.variation as ProductValidationSchemaType['variation']
                                )?.[index]?.type) as string
                            }
                          >
                            <option value="X">{t('X')}</option>
                            <option value="Y">{t('Y')}</option>
                          </SelectInput>
                          <TextField
                            namespace="HomePage"
                            placeholder="variation_description"
                            label="Variation"
                            {...formik.getFieldProps(
                              `variation.${index}.variant`,
                            )}
                            errorMessage={
                              ((
                                formik.touched
                                  ?.variation as ProductValidationSchemaType['variation']
                              )?.[index]?.variant &&
                                (
                                  formik.errors
                                    .variation as ProductValidationSchemaType['variation']
                                )?.[index]?.variant) as string
                            }
                          />
                          <Button
                            mt="24px"
                            p={0}
                            width="2.5rem"
                            backgroundColor="red.200"
                            color="red.500"
                            _hover={{
                              backgroundColor: 'red.100',
                            }}
                            onClick={() => {
                              arrayHelpers.remove(index);
                            }}
                          >
                            <HiMiniXMark size="1.25rem" />
                          </Button>
                        </Flex>
                      ))}
                      <Button
                        width="fit-content"
                        color={COLORS._primaryColor}
                        background={COLORS._primaryColor100}
                        onClick={() => {
                          return arrayHelpers.push({ type: '', variant: '' });
                        }}
                      >
                        {t('Add Variant')}
                      </Button>
                    </>
                  )}
                />
              </Card>

              <Card
                padding={5}
                width="100%"
                borderRadius={8}
                display="grid"
                gap="0.88rem"
              >
                <Text fontWeight="medium" fontSize={18}>
                  {t('Shipping')}
                </Text>
                <Checkbox
                  colorScheme="purple"
                  color={COLORS._primaryColor}
                  fontSize={600}
                  defaultChecked={initialValues.isPhysical}
                  {...formik.getFieldProps('isPhysical')}
                >
                  {t('physical_product_description')}
                </Checkbox>
                <Flex gap={3}>
                  <TextField
                    namespace="HomePage"
                    label="Weight"
                    backgroundColor={COLORS._lightBackground}
                    type="number"
                    placeholder="product_weight_description"
                    transition="0.4s"
                    {...getInputProps('weight')}
                  />

                  <TextField
                    namespace="HomePage"
                    label="Height"
                    backgroundColor={COLORS._lightBackground}
                    type="number"
                    placeholder="height_description"
                    transition="0.4s"
                    {...getInputProps('height')}
                  />

                  <TextField
                    namespace="HomePage"
                    label="Length"
                    backgroundColor={COLORS._lightBackground}
                    type="number"
                    placeholder="length_description"
                    transition="0.4s"
                    {...getInputProps('length')}
                  />

                  <TextField
                    namespace="HomePage"
                    label="Width"
                    backgroundColor={COLORS._lightBackground}
                    type="number"
                    placeholder="width_description"
                    transition="0.4s"
                    {...getInputProps('width')}
                  />
                </Flex>
              </Card>
            </SimpleGrid>

            <SimpleGrid
              gridTemplateColumns={{ md: 'auto auto', xl: '1fr' }}
              justifyContent={{ md: 'space-between' }}
              placeContent="start"
              gap="0.88rem"
            >
              <Card
                width={350}
                height="fit-content"
                padding={5}
                display="grid"
                gap="0.88rem"
              >
                <Text fontSize={18}>{t('Category')}</Text>

                <SelectInput
                  backgroundColor={COLORS._lightBackground}
                  label="Product Category"
                  variant="outline"
                  placeholder="Choose Category"
                  {...getInputProps('category')}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {t(category.name as TranslationKey<'HomePage'>)}
                    </option>
                  ))}
                </SelectInput>

                <Box>
                  <TextField
                    namespace="HomePage"
                    label="Product Tags"
                    onKeyDown={handleAddTags}
                    backgroundColor={COLORS._lightBackground}
                    type="text"
                    placeholder="tags_placeholder"
                    transition="0.4s"
                    value={tag}
                    onChange={({ target: { value } }) => {
                      setTag(value);
                    }}
                    onBlur={({ target: { value } }) => {
                      if (value.length < 3) {
                        setTag('');
                        return formik.setFieldError('tag', '');
                      }
                    }}
                    errorMessage={formik.errors.tag as string}
                  />
                  <Flex gap={2} flexWrap="wrap" mt="0.88rem">
                    {tags.map((keyWord, index) => (
                      <Tag
                        size="lg"
                        key={keyWord}
                        variant="subtle"
                        background={COLORS._primaryColor100}
                        color={COLORS._primaryColor}
                      >
                        <TagLabel>{keyWord}</TagLabel>
                        <TagCloseButton onClick={() => removeTag(index)} />
                      </Tag>
                    ))}
                  </Flex>
                </Box>
              </Card>

              <Card
                width={350}
                height="fit-content"
                padding={5}
                display="grid"
                gap="0.88rem"
              >
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  gap="0.88rem"
                >
                  <Text fontSize={18}>{t('Status')}</Text>
                  <Tag
                    size="md"
                    textTransform="capitalize"
                    {...StatusColors[
                      formik.values.status === 'draft' ? 'Draft' : 'Published'
                    ]}
                  >
                    {formik.values.status}
                  </Tag>
                </Flex>

                <SelectInput
                  backgroundColor={COLORS._lightBackground}
                  label="Product Status"
                  placeholder=""
                  variant="outline"
                  {...getInputProps('status')}
                >
                  <option value="draft">{t('Draft')}</option>
                  <option value="published">{t('Published')}</option>
                </SelectInput>
              </Card>
            </SimpleGrid>
          </SimpleGrid>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default ProductForm;
