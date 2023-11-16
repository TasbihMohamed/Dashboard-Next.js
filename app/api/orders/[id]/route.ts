import { respond } from '@/app/utils/api-base-errors';
import {
  CategoriesImagePath,
  makeDirectUrl,
  ProductsImagePath,
  validateAuth,
} from '@/app/utils/api-helpers';
import { getOrderById, getStoreByUserId } from '@/app/utils/db-helpers';

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

  const order = await getOrderById(params.id, store._id);

  if (!order) {
    return NextResponse.json({
      status: 404,
      success: false,
      text: 'Product not found!',
    });
  }

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

  return NextResponse.json(
    Object.fromEntries(
      Object.entries(order).sort(([a], [b]) => {
        if (a === 'id') return -1;
        if (b === 'id') return 1;
        return 0;
      }),
    ),
  );
};
