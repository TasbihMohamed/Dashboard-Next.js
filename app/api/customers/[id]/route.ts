import { ExportableOrder } from '@/app/types/DataBase';
import { respond } from '@/app/utils/api-base-errors';
import {
  CategoriesImagePath,
  makeDirectUrl,
  ProductsImagePath,
  validateAuth,
} from '@/app/utils/api-helpers';
import { getCustomerById, getStoreByUserId } from '@/app/utils/db-helpers';

import { NextRequest, NextResponse } from 'next/server';

type Params = {
  params: {
    id: string;
  };
};

export const GET = async (request: NextRequest, { params }: Params) => {
  const payload = await validateAuth(request);
  if (!payload) return respond('unauthorized');
  const store = await getStoreByUserId(payload.uid);
  if (!store) return respond(`not-found`);

  if (!params.id) {
    return NextResponse.json({ text: 'Params Missing, Order id missing!' });
  }

  const customer = await getCustomerById(params.id, store._id);

  if (!customer) {
    return NextResponse.json({
      status: 404,
      success: false,
      text: 'Customer not found!',
    });
  }

  customer.orders = customer.orders.map(order => {
    order.products.forEach(product => {
      product.mainImage = makeDirectUrl(
        ProductsImagePath,
        product.mainImage as string,
        `/api/products/${product.id}/images/${product.mainImage}`,
      );
      product.images = product.images.map(image =>
        makeDirectUrl(
          ProductsImagePath,
          image as string,
          `/api/products/${product.id}/images/${image}`,
        ),
      );
      product.category.image = makeDirectUrl(
        CategoriesImagePath,
        product.category.image as string,
        `/api/categories/${product.category.id}/image/${
          product.category.image as string
        }`,
      );
    });
    return Object.fromEntries(
      Object.entries(order).sort(([a], [b]) => {
        if (a === 'id') return -1;
        if (b === 'id') return 1;
        return 0;
      }),
    );
  }) as ExportableOrder[];

  return NextResponse.json(
    Object.fromEntries(
      Object.entries(customer).sort(([a], [b]) => {
        if (a === 'id') return -1;
        if (b === 'id') return 1;
        return 0;
      }),
    ),
  );
};
