import { respond } from '@/app/utils/api-base-errors';
import { validateAuth } from '@/app/utils/api-helpers';
import { Collections, updateProductById } from '@/app/utils/db-helpers';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  params: {
    id: string;
  };
};

export const POST = async (request: NextRequest, { params }: Params) => {
  const payload = await validateAuth(request);
  if (!payload) return respond('unauthorized');
  const product = await Collections.Products.findOne(
    { _id: params.id, owner: payload.uid },
    { projection: { mainImage: 1, images: 1 } },
  );
  if (!product) return respond(`not-found`);
  const body = (await request.json().catch(() => null)) as string[];
  if (!body || !Array.isArray(body)) return respond('bad-request');
  const images = [product.mainImage, ...product.images];
  images.sort((a, b) => {
    if (body.indexOf(a) < body.indexOf(b)) return -1;
    if (body.indexOf(a) > body.indexOf(b)) return 1;
    return 0;
  });
  const updated = updateProductById(payload.uid, params.id, {
    $set: { mainImage: images[0], images: images.slice(1) },
  })
    .then(() => true)
    .catch(() => false);
  if (!updated) return respond('internal-server-error');
  return NextResponse.json({ success: true });
};
