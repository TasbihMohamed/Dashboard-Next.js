import { CategoryInsertionData } from '@/app/types/DataBase';
import { respond } from '@/app/utils/api-base-errors';
import {
  CategoriesImagePath,
  makeDirectUrl,
  saveImage,
  validateAuth,
  validateField,
} from '@/app/utils/api-helpers';
import {
  addNewCategory,
  getAllCategories,
  userHasCategory,
} from '@/app/utils/db-helpers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const payload = await validateAuth(request);
  if (!payload) return respond('unauthorized');

  const categories = await getAllCategories(payload.uid).catch(() => null);

  if (!categories) return respond('internal-server-error');

  categories.forEach(category => {
    category.image = makeDirectUrl(
      CategoriesImagePath,
      category.image as string,
      `/api/categories/${category.id}/image/${category.image as string}`,
    );
  });

  return NextResponse.json(categories);
};

export const POST = async (request: NextRequest) => {
  const payload = await validateAuth(request);
  if (!payload) return respond('unauthorized');
  const body = await request.formData().catch(() => null);
  if (body === null) return respond('bad-request');

  const fields: CategoryInsertionData = {
    name: '',
    owner: payload.uid,
    image: '',
  };

  const name = body.get('name') as string;
  if (await userHasCategory(payload.uid, name))
    return respond('bad-request', { name: 'category already exists' });
  switch (validateField(name, { type: 'string', min: 3, max: 100 })) {
    case validateField.VALID:
      fields.name = name;
      break;
    case validateField.NULL:
      return respond('bad-request', { message: 'category name is required' });
    case validateField.INVALID_TYPE:
      return respond('bad-request', { message: 'invalid category name' });
    case validateField.UNDER_MIN:
      return respond('bad-request', { message: 'category name is too short' });
    case validateField.OVER_MAX:
      return respond('bad-request', { message: 'category name is too large' });
  }

  const image = body.get('image') as File;
  if (image) {
    if (!(image instanceof File))
      return respond('bad-request', { message: 'invalid category image' });
    if (image.size < 4096)
      return respond('bad-request', { message: 'image size is too small' });
    if (image.size > 1048576)
      return respond('bad-request', { message: 'image size is too large' });
  } else
    return respond('bad-request', {
      message: 'category image is required',
    });

  const imageName = await saveImage(CategoriesImagePath, image);

  if (!imageName)
    return respond('bad-request', {
      message: 'invalid category image',
    });

  fields.image = imageName;

  const id = await addNewCategory(fields).catch(() => null);

  if (!id)
    return respond('internal-server-error', {
      message: 'category insertion failed',
    });

  return NextResponse.json({ success: true, categoryID: id }, { status: 201 });
};
