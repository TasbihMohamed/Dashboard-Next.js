import { respond } from '@/app/utils/api-base-errors';
import {
  ProductsImagePath,
  validateAuth,
  validateDirectUrl,
} from '@/app/utils/api-helpers';
import {
  Collections,
  productImageExists,
  updateProductById,
} from '@/app/utils/db-helpers';
import { fileTypeFromBuffer } from 'file-type';
import { existsSync } from 'fs';
import { readFile, unlink } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

type Params = {
  params: {
    id: string;
    filename: string;
  };
};

export const GET = async (request: NextRequest, { params }: Params) => {
  const exists = await productImageExists(params.id, params.filename);
  const path = join(ProductsImagePath, params.filename);
  const fileExists = existsSync(path);
  if (!exists || !fileExists) return respond('not-found');
  const hasToken = request.headers.has('Authorization');
  const tokenAuth = hasToken && (await validateAuth(request));
  const hasHmac = request.nextUrl.searchParams.has('hmac');
  const hmacAuth = hasHmac && validateDirectUrl(request.nextUrl);
  if (!tokenAuth && !hmacAuth) {
    if (hasToken && hasHmac)
      return respond('unauthorized', {
        message: 'invalid token & url signature mismatch',
      });
    else if (hasToken)
      return respond('unauthorized', { message: 'invalid token' });
    else if (hasHmac)
      return respond('unauthorized', { message: 'url signature mismatch' });
    else return respond('unauthorized', { message: 'authorization needed' });
  }
  if (hmacAuth && !tokenAuth) {
    const exp = request.nextUrl.searchParams.get('exp');
    if (exp && Date.now() >= +exp)
      return respond('unauthorized', { message: 'url signature expired' });
  }
  const buffer = await readFile(path);
  const type = await fileTypeFromBuffer(buffer);
  const headers = new Headers();
  // headers.set(
  //   'content-disposition',
  //   `attachment; filename="${params.filename}"`,
  // );
  headers.set('content-type', String(type?.mime));
  headers.set('content-length', String(buffer.byteLength));
  return new NextResponse(buffer, { headers });
};

export const DELETE = async (request: NextRequest, { params }: Params) => {
  const payload = await validateAuth(request);
  if (!payload) return respond('unauthorized');
  const product = await Collections.Products.findOne(
    {
      _id: params.id,
      owner: payload.uid,
    },
    {
      projection: {
        mainImage: 1,
        images: 1,
      },
    },
  );
  if (
    !product ||
    (params.filename !== product.mainImage &&
      !product.images.includes(params.filename))
  )
    return respond('not-found');
  if (params.filename === product.mainImage)
    return respond('bad-request', {
      message: 'Main image cannot be removed, try to change it',
    });
  product.images.splice(product.images.indexOf(params.filename), 1);
  const updated = await updateProductById(payload.uid, params.id, {
    $set: { images: product.images },
  })
    .then(() => true)
    .catch(() => false);

  if (!updated) return respond('internal-server-error');
  const path = join(ProductsImagePath, params.filename);
  if (existsSync(path)) await unlink(path);

  return NextResponse.json({ success: true });
};
