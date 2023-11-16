'use client';

import ProductForm from '@/app/components/Common/ProductsList/ProductForm';

export default function Form() {
  const onSubmit = async (formData: FormData) => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          '_shoptak-user-session',
        )}`,
      },
      body: formData,
    });

    if (!response.ok) throw response;
  };

  const initialValues = {
    name: '',
    description: '',
    image: [],
    price: 0,
    discount: '',
    discountPercentage: 0,
    tax: '',
    vatAmount: 0,
    sku: '',
    barcode: '',
    stock: 0,
    isPhysical: false,
    weight: 0,
    height: 0,
    length: 0,
    width: 0,
    category: '',
    variation: [],
    tag: [],
    status: 'draft',
  };

  return (
    <ProductForm
      title="Add Product"
      initialValues={initialValues}
      onSubmit={onSubmit}
      onResetForm={helpers => {
        helpers.resetForm(initialValues);
      }}
    />
  );
}
