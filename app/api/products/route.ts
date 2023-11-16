import { ProductInsertionData } from '@/app/types/DataBase';
import { respond } from '@/app/utils/api-base-errors';
import {
  exportProduct,
  ProductsImagePath,
  saveImage,
  validateAuth,
  validateField,
} from '@/app/utils/api-helpers';
import {
  addNewProduct,
  getProducts,
  getProductsCount,
  userHasCategory,
} from '@/app/utils/db-helpers';
import { NextRequest, NextResponse } from 'next/server';

const ProductsPerPage = 10;

export const GET = async (request: NextRequest) => {
  const payload = await validateAuth(request);
  if (!payload) return respond('unauthorized');
  const count = await getProductsCount(payload.uid);
  const pages = Math.ceil(count / ProductsPerPage);
  const requestPage = request.nextUrl.searchParams.get('page');
  if (requestPage && !Number.isFinite(+requestPage))
    return respond('bad-request');
  const page = requestPage ? +requestPage : 1;
  if (page > pages) return respond('not-found');
  const products = await getProducts(
    payload.uid,
    (page - 1) * ProductsPerPage,
    ProductsPerPage,
  );
  return NextResponse.json(products.map(product => exportProduct(product)));
};

export const POST = async (request: NextRequest) => {
  const payload = await validateAuth(request);
  if (!payload) return respond('unauthorized');
  const body = await request.formData().catch(() => null);
  if (body === null) return respond('bad-request');

  const fields: ProductInsertionData = {
    name: '',
    description: '',
    price: 0,
    category: '',
    discount: 0,
    tax: 0,
    mainImage: '',
    barcode: '',
    sku: '',
    weight: 0,
    owner: payload.uid,
    stockQuantity: 0,
    images: [],
  };

  const name = body.get('name') as string;
  switch (validateField(name, { type: 'string', min: 10, max: 300 })) {
    case validateField.VALID:
      fields.name = name;
      break;
    case validateField.NULL:
      return respond('bad-request', { message: 'product name is required' });
    case validateField.INVALID_TYPE:
      return respond('bad-request', { message: 'invalid product name' });
    case validateField.UNDER_MIN:
      return respond('bad-request', { message: 'product name is too short' });
    case validateField.OVER_MAX:
      return respond('bad-request', { message: 'product name is too large' });
  }

  const description = body.get('description') as string;
  switch (validateField(description, { type: 'string', min: 20, max: 5000 })) {
    case validateField.VALID:
      fields.description = description;
      break;
    case validateField.NULL:
      return respond('bad-request', {
        message: 'product description is required',
      });
    case validateField.INVALID_TYPE:
      return respond('bad-request', { message: 'invalid product description' });
    case validateField.UNDER_MIN:
      return respond('bad-request', {
        message: 'product description is too short',
      });
    case validateField.OVER_MAX:
      return respond('bad-request', {
        message: 'product description is too large',
      });
  }

  const price = body.get('price') as string;
  switch (validateField(price, { type: 'number' })) {
    case validateField.VALID:
      fields.price = +price;
      break;
    case validateField.NULL:
      return respond('bad-request', { message: 'product price is required' });
    case validateField.INVALID_TYPE:
      return respond('bad-request', { message: 'invalid product price' });
  }

  const weight = body.get('weight') as string;
  switch (validateField(weight, { type: 'number' })) {
    case validateField.VALID:
      fields.weight = +weight;
      break;
    case validateField.NULL:
      return respond('bad-request', { message: 'product weight is required' });
    case validateField.INVALID_TYPE:
      return respond('bad-request', { message: 'invalid product weight' });
  }

  const stock = body.get('stock') as string;
  switch (validateField(stock, { type: 'number' })) {
    case validateField.VALID:
      fields.stockQuantity = +stock;
      break;
    case validateField.NULL:
      return respond('bad-request', { message: 'product stock is required' });
    case validateField.INVALID_TYPE:
      return respond('bad-request', { message: 'invalid product stock' });
  }

  const category = body.get('category') as string;
  if (!(await userHasCategory(payload.uid, category)))
    return respond('bad-request', { message: 'category not found' });
  switch (validateField(category, { type: 'string' })) {
    case validateField.VALID:
      fields.category = category;
      break;
    case validateField.NULL:
      return respond('bad-request', {
        message: 'product category is required',
      });
    case validateField.INVALID_TYPE:
      return respond('bad-request', { message: 'invalid product category' });
  }

  const sku = body.get('sku') as string;
  switch (validateField(sku, { type: 'string' })) {
    case validateField.VALID:
      fields.sku = sku;
      break;
    case validateField.NULL:
      return respond('bad-request', { message: 'product SKU is required' });
    case validateField.INVALID_TYPE:
      return respond('bad-request', { message: 'invalid product sku' });
  }

  const barcode = body.get('barcode') as string;
  switch (validateField(barcode, { type: 'string' })) {
    case validateField.VALID:
      fields.barcode = barcode;
      break;
    case validateField.NULL:
      return respond('bad-request', { message: 'product barcode is required' });
    case validateField.INVALID_TYPE:
      return respond('bad-request', { message: 'invalid product barcode' });
  }

  const images = body.getAll('image') as File[];
  if (images.length) {
    if (images.some(image => !(image instanceof File)))
      return respond('bad-request', { message: 'invalid product image' });
    if (images.some(image => image.size < 4096))
      return respond('bad-request', { message: 'image size is too small' });
    if (images.some(image => image.size > 4194304))
      return respond('bad-request', { message: 'image size is too large' });
  } else
    return respond('bad-request', {
      message: 'at least one image is required for a product',
    });

  const mainImage = await saveImage(ProductsImagePath, images[0]);

  if (!mainImage)
    return respond('bad-request', {
      message: 'invalid product image',
    });

  fields.mainImage = mainImage;

  for (let i = 1; i < images.length; i++) {
    const image = await saveImage(ProductsImagePath, images[i]);
    if (image) fields.images.push(image);
  }

  const id = await addNewProduct(fields).catch(() => null);

  if (!id)
    return respond('internal-server-error', {
      message: 'Product insertion failed',
    });

  return NextResponse.json({ success: true, productID: id }, { status: 201 });
};
