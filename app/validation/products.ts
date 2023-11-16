import * as yup from 'yup';
import { InferType } from 'yup';

export const productValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(10, 'Product name should at least 10 characters')
    .max(100, 'Product name should at most 300 characters')
    .required('Product name is required.'),
  description: yup
    .string()
    .min(20, 'Product description should at least 20 characters')
    .max(5000, 'Product description should at most 5000 characters')
    .required('Description is required.'),
  image: yup
    .array()
    .of(yup.mixed().required('Photo is required.'))
    .test('image-size-validation', 'Image size is too small', images => {
      return !images?.some(image => (image as File).size < 4096);
    })
    .test('image-size-validation', 'Image size is too large', images => {
      return !images?.some(image => (image as File).size > 4194304);
    })
    .min(1, 'At least upload one image for the product'),
  price: yup
    .number()
    .min(0, 'Price must be 0 or higher.')
    .required('Price is required.'),
  discount: yup.string().required('Discount is required'),
  discountPercentage: yup
    .number()
    .min(0, 'Discount percentage must be 0 or higher.')
    .max(100, "Discount percentage can't be more than 100.")
    .required('Discount percentage is required'),
  tax: yup.string().required('Tax Class is required'),
  vatAmount: yup
    .number()
    .min(0, 'VAT amount must be 0 or higher.')
    .max(100, "VAT amount can't be more than 100.")
    .required('VAT amount is required'),
  sku: yup.string().required('SKU is required.'),
  barcode: yup.string(),
  stock: yup
    .number()
    .min(0, 'Quantity must be 0 or higher.')
    .required('Quantity is required.'),
  variation: yup.array().of(
    yup.object({
      type: yup.string().required('Variation type is required'),
      variant: yup.string().required('Variant is required'),
    }),
  ),
  isPhysical: yup.boolean(),
  weight: yup
    .number()
    .min(0, 'Weight must be 0 or higher.')
    .required('Weight is required.'),
  height: yup
    .number()
    .min(0, 'Height must be 0 or higher.')
    .required('Height is required.'),
  length: yup
    .number()
    .min(0, 'Length must be 0 or higher.')
    .required('Length is required.'),
  width: yup
    .number()
    .min(0, 'Width must be 0 or higher.')
    .required('Width is required.'),
  category: yup.string().required('Product category is required.'),
  tag: yup.array(),
  status: yup.string().required('Product status is required.'),
});

export type ProductValidationSchemaType = InferType<
  typeof productValidationSchema
>;
