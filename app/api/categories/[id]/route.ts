import { respond } from '@/app/utils/api-base-errors';
import { CategoriesImagePath, validateAuth } from '@/app/utils/api-helpers';
import {
  categoryHasProducts,
  deleteCategoryById,
  getCategoryById,
} from '@/app/utils/db-helpers';
import { unlink } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

type Params = {
  params: {
    id: string;
  };
};

export const DELETE = async (request: NextRequest, { params }: Params) => {
  const payload = await validateAuth(request);
  if (!payload) return respond('unauthorized');
  const category = await getCategoryById(payload.uid, params.id);
  if (!category) return respond('not-found');
  if (await categoryHasProducts(payload.uid, category.id))
    return respond('bad-request', {
      message: 'There are products linked with this category',
    });
  const deleted = await deleteCategoryById(payload.uid, params.id)
    .then(() => true)
    .catch(() => false);
  if (!deleted) return respond('internal-server-error');
  await unlink(join(CategoriesImagePath, category.image as string)).catch(
    () => null,
  );
  return NextResponse.json({ success: true });
};
