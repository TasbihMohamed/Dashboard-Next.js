import { ProductsImagePath } from '@/app/utils/api-helpers';
import { Collections } from '@/app/utils/db-helpers';
import { Features, identify } from 'imagemagick';
import { NextResponse } from 'next/server';
import { join } from 'path';

export async function GET() {
  const product = await Collections.Products.findOne();
  if (!product) return NextResponse.json(null);
  const { err, result } = (await new Promise(rs => {
    identify(join(ProductsImagePath, product.mainImage), (err, result) =>
      rs({ err, result }),
    );
  })) as { err: null | Error; result: Features };
  return NextResponse.json({ err, result });
}
