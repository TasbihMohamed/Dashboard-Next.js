import { respond } from '@/app/utils/api-base-errors';
import {
  CategoriesImagePath,
  validateAuth,
  validateDirectUrl,
} from '@/app/utils/api-helpers';
import { categoryImageExists } from '@/app/utils/db-helpers';
import { fileTypeFromBuffer } from 'file-type';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

type Params = {
  params: {
    id: string;
    filename: string;
  };
};

export const GET = async (request: NextRequest, { params }: Params) => {
  const exists = await categoryImageExists(params.id, params.filename);
  const path = join(CategoriesImagePath, params.filename);
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
