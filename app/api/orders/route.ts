import { respond } from '@/app/utils/api-base-errors';
import {
  CategoriesImagePath,
  makeDirectUrl,
  ProductsImagePath,
  validateAuth,
} from '@/app/utils/api-helpers';
import {
  getOrders,
  getOrdersCount,
  getStoreByUserId,
} from '@/app/utils/db-helpers';
import { NextRequest, NextResponse } from 'next/server';

const OrdersPerPage = 10;

export const GET = async (request: NextRequest) => {
  const payload = await validateAuth(request);
  if (!payload) return respond('unauthorized');
  const store = await getStoreByUserId(payload.uid);
  if (!store) return respond(`not-found`);
  const count = await getOrdersCount(store._id);
  const pages = Math.ceil(count / OrdersPerPage);
  const requestPage = request.nextUrl.searchParams.get('page');
  if (requestPage && !Number.isFinite(+requestPage))
    return respond('bad-request');
  const page = requestPage ? +requestPage : 1;
  if (page > pages) return respond('not-found');

  const orders = await getOrders(
    store._id,
    (page - 1) * OrdersPerPage,
    OrdersPerPage,
  );

  return NextResponse.json(
    orders.map(order => {
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
    }),
  );
};
