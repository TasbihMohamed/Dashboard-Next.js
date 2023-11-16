import { createHmac, randomUUID } from 'crypto';
import { fileTypeFromBlob } from 'file-type/core';
import { existsSync, mkdirSync, statSync } from 'fs';
import { writeFile } from 'fs/promises';
import { NextURL } from 'next/dist/server/web/next-url';
import { NextRequest } from 'next/server';
import { join, resolve } from 'path';
import { ExportableProduct } from '../types/DataBase';
import { hasToken } from './db-helpers';
import { JWTUserPayload, parseToken } from './jwt-helpers';

export const StorageRoot = resolve(__dirname.split('.next')[0], 'storage');
export const ProductsImagePath = join(StorageRoot, 'images', 'products');
export const CategoriesImagePath = join(StorageRoot, 'images', 'categories');

if (!existsSync(ProductsImagePath))
  mkdirSync(ProductsImagePath, { recursive: true });
if (!existsSync(ProductsImagePath))
  mkdirSync(ProductsImagePath, { recursive: true });

const acceptedImageTypes = ['image/jpeg', 'image/png'];
export async function saveImage(
  root: string,
  image: File,
): Promise<string | null> {
  const type = await fileTypeFromBlob(image);
  if (!type || !acceptedImageTypes.includes(type.mime)) return null;
  const buf = await image.arrayBuffer();
  const imageID = `${randomUUID({ disableEntropyCache: true })}.${type.ext}`;
  const isSaved = await writeFile(join(root, imageID), Buffer.from(buf))
    .then(() => true)
    .catch(() => false);
  if (!isSaved) return null;
  return imageID;
}

export async function validateAuth(
  req: NextRequest,
): Promise<JWTUserPayload | false> {
  if (!req.headers.has('Authorization')) return false;
  const match = req.headers.get('Authorization')?.match(/^Bearer (.+?)$/);
  if (!match) return false;
  const [, token] = match;
  const payload = parseToken<JWTUserPayload>(token);
  if (!payload || !(await hasToken(payload.jti, payload.iat))) return false;
  return payload.sub === 'user' && Date.now() < payload.exp ? payload : false;
}

type ValidateOptions = {
  type: 'string' | 'number' | 'file';
  min?: number;
  max?: number;
  // eslint-disable-next-line no-unused-vars
  check?: (item: FormDataEntryValue) => boolean;
};

type ErrorLevel = 0 | 1 | 2 | 3 | 4 | 5;

export function validateField(
  item: FormDataEntryValue | null,
  options: ValidateOptions,
): ErrorLevel {
  if (item === null) return 1;

  if (options.type === 'string') {
    if (item instanceof File) return 2;

    if (typeof options.min === 'number' && item.length < options.min) return 4;

    if (typeof options.max === 'number' && item.length > options.max) return 5;
  } else if (options.type === 'number') {
    if (item instanceof File || !Number.isFinite(+item)) return 2;

    if (typeof options.min === 'number' && +item < options.min) return 4;

    if (typeof options.max === 'number' && +item > options.max) return 5;
  } else if (options.type === 'file') {
    if (typeof item === 'string') return 2;

    if (typeof options.min === 'number' && item.size < options.min) return 4;

    if (typeof options.max === 'number' && item.size > options.max) return 5;
  }

  if (typeof options.check === 'function' && !options.check(item)) return 3;

  return 0;
}

validateField.VALID = 0;
validateField.NULL = 1;
validateField.INVALID_TYPE = 2;
validateField.INVALID_CHECK = 3;
validateField.UNDER_MIN = 4;
validateField.OVER_MAX = 5;

const HMAC_SECRET = Buffer.from(
  'HesMGEVrVJvYNvkw13tNotESJpG5GhJo5TbBqzNslhk=',
  'base64',
);

export type ImageObject = {
  uri: string;
  filename: string;
  size: number;
};

export function makeDirectUrl(
  path: string,
  filename: string,
  uri: string,
): ImageObject | null {
  if (!path || !filename || !existsSync(join(path, filename))) return null;
  const searchParams = new URLSearchParams();
  searchParams.set('exp', String(Date.now() + 43200000));
  const url = `${uri}?${searchParams.toString()}`;
  const hmac = createHmac('sha256', HMAC_SECRET).update(url).digest('hex');
  searchParams.set('hmac', hmac);
  return {
    uri: `${uri}?${searchParams.toString()}`,
    filename: filename,
    size: statSync(join(path, filename)).size,
  };
}

export function validateDirectUrl(url: NextURL): boolean {
  const searchParams = new URLSearchParams();
  for (const [key, value] of url.searchParams.entries()) {
    if (key === 'hmac') continue;
    searchParams.set(key, value);
  }
  return (
    createHmac('sha256', HMAC_SECRET)
      .update(`${url.pathname}?${searchParams.toString()}`)
      .digest('hex') === url.searchParams.get('hmac')
  );
}

export const exportProduct = (
  product: ExportableProduct,
): ExportableProduct => {
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
  if (product.category)
    product.category.image = makeDirectUrl(
      CategoriesImagePath,
      product.category.image as string,
      `/api/categories/${product.category.id}/image/${
        product.category.image as string
      }`,
    );
  else product.category = null;
  return product;
};
