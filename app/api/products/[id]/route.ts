import { Product } from '@/app/types/DataBase';
import { respond } from '@/app/utils/api-base-errors';
import {
  exportProduct,
  ProductsImagePath,
  saveImage,
  validateAuth,
  validateField,
} from '@/app/utils/api-helpers';
import {
  Collections,
  deleteProductById,
  getProductById,
  productExists,
  updateProductById,
  userHasCategory,
} from '@/app/utils/db-helpers';
import { existsSync } from 'fs';
import { unlink } from 'fs/promises';
import { UpdateFilter } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

type Params = {
  params: {
    id: string;
  };
};

export const GET = async (request: NextRequest, { params }: Params) => {
  const payload = await validateAuth(request);
  if (!payload) return respond('unauthorized');
  const product = await getProductById(payload.uid, params.id);
  if (!product) return respond('not-found');
  return NextResponse.json(exportProduct(product));
};

export const PUT = async (request: NextRequest, { params }: Params) => {
  const payload = await validateAuth(request);
  if (!payload) return respond('unauthorized');
  if (!(await productExists(payload.uid, params.id)))
    return respond('not-found');
  const body = await request.formData().catch(() => null);
  if (body === null) return respond('bad-request');

  const fields: Partial<Product> = {};

  const deletables: string[] = [];

  const update: UpdateFilter<Product> = { $set: fields };

  const name = body.get('name') as string;
  switch (validateField(name, { type: 'string', min: 10, max: 300 })) {
    case validateField.VALID:
      fields.name = name;
      break;
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
    case validateField.INVALID_TYPE:
      return respond('bad-request', { message: 'invalid product price' });
  }

  const weight = body.get('weight') as string;
  switch (validateField(weight, { type: 'number' })) {
    case validateField.VALID:
      fields.weight = +weight;
      break;
    case validateField.INVALID_TYPE:
      return respond('bad-request', { message: 'invalid product weight' });
  }

  const stock = body.get('stock') as string;
  switch (validateField(stock, { type: 'number' })) {
    case validateField.VALID:
      fields.stockQuantity = +stock;
      break;
    case validateField.INVALID_TYPE:
      return respond('bad-request', { message: 'invalid product stock' });
  }

  const category = body.get('category') as string;
  if (category !== null && !(await userHasCategory(payload.uid, category)))
    return respond('bad-request', { message: 'category not found' });
  switch (validateField(category, { type: 'string' })) {
    case validateField.VALID:
      fields.category = category;
      break;
    case validateField.INVALID_TYPE:
      return respond('bad-request', { message: 'invalid product category' });
  }

  const sku = body.get('sku') as string;
  switch (validateField(sku, { type: 'string' })) {
    case validateField.VALID:
      fields.sku = sku;
      break;
    case validateField.INVALID_TYPE:
      return respond('bad-request', { message: 'invalid product sku' });
  }

  const barcode = body.get('barcode') as string;
  switch (validateField(barcode, { type: 'string' })) {
    case validateField.VALID:
      fields.barcode = barcode;
      break;
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

    const mainImage = await saveImage(ProductsImagePath, images[0]);

    if (!mainImage)
      return respond('bad-request', {
        message: 'invalid product image',
      });

    const currentMainImage = (
      await Collections.Products.findOne(
        {
          _id: params.id,
          owner: payload.jti,
        },
        { projection: { mainImage: 1 } },
      )
    )?.mainImage;

    if (currentMainImage) deletables.push(currentMainImage);

    fields.mainImage = mainImage;

    if (images.length > 1) {
      fields.images = [];

      const currentImages = (
        await Collections.Products.findOne(
          {
            _id: params.id,
            owner: payload.jti,
          },
          { projection: { images: 1 } },
        )
      )?.images;

      if (currentImages) deletables.push(...currentImages);

      for (let i = 1; i < images.length; i++) {
        const image = await saveImage(ProductsImagePath, images[i]);
        if (image) fields.images.push(image);
      }
    }
  }

  const updated = await updateProductById(payload.uid, params.id, update)
    .then(() => true)
    .catch(() => false);

  if (!updated) return respond('internal-server-error');

  for (const deletable of deletables) {
    const path = join(ProductsImagePath, deletable);
    if (existsSync(path)) await unlink(path);
  }

  return NextResponse.json({ success: true });
};

export const DELETE = async (request: NextRequest, { params }: Params) => {
  const payload = await validateAuth(request);
  if (!payload) return respond('unauthorized');
  const product = await getProductById(payload.uid, params.id);
  if (!product) return respond('not-found');
  const deleted = await deleteProductById(payload.uid, params.id)
    .then(() => true)
    .catch(() => false);
  if (!deleted) return respond('internal-server-error');
  for (const image of [product.mainImage, ...product.images]) {
    await unlink(join(ProductsImagePath, image as string)).catch(() => null);
  }
  return NextResponse.json({ success: true });
};
