'use client';

import ProductForm from '@/app/components/Common/ProductsList/ProductForm';
import { useEffect, useState } from 'react';
import { ProductValidationSchemaType } from '@/app/validation/products';
import { Text } from '@chakra-ui/react';

const initialValues = {
  name: 'Mahmoud Tarek',
  description: 'This is the first time i did it',
  image: [],
  price: 1000,
  discount: '',
  discountPercentage: 3,
  tax: '1111',
  vatAmount: 3,
  sku: 'dddd3332',
  barcode: 'ddd2fdsfd33322',
  stock: 33,
  isPhysical: true,
  weight: 33,
  height: 0,
  length: 0,
  width: 0,
  category: '',
  variation: [{ type: 'X', variant: 'TWO' }],
  tag: ['One'],
  status: 'draft',
};

interface FormProps {
  params: {
    id: string;
  };
}

export default function Form({ params }: FormProps) {
  const [product, setProduct] =
    useState<ProductValidationSchemaType>(initialValues);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    setLoading(true);
    fetch(`/api/products/${params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          '_shoptak-user-session',
        )}`,
      },
    })
      .then(resp => resp.json())
      .then((product: ProductValidationSchemaType) =>
        setProduct({
          ...initialValues,
          ...product,
          status: 'draft',
          category: 'Accessoires',
        }),
      )
      .finally(() => {
        setLoading(false);
      });
  }, [params.id]);

  const onSubmit = async (formData: FormData) => {
    if (!params.id) return;
    // TODO enabling to edit the image later
    if (formData.has('image')) formData.delete('image');
    const response = await fetch(`/api/products/${params.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          '_shoptak-user-session',
        )}`,
      },
      body: formData,
    });

    if (!response.ok) throw response;
  };

  if (loading)
    return (
      <Text padding="24px 24px" pl="32px">
        loading...
      </Text>
    );

  return (
    <ProductForm
      title="Product Details"
      initialValues={product}
      onSubmit={onSubmit}
      submitButtonText="Save Product"
    />
  );
}
