import { validateAuth } from '@/app/utils/api-helpers';
import { getUserById, getUserStore } from '@/app/utils/db-helpers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const auth = await validateAuth(request);
  if (!auth) return NextResponse.json({ status: 401 });
  const user = await getUserById(auth.uid);
  const storeId = user?.storeId;
  if (!storeId) {
    return NextResponse.json({ status: 404, data: 'Store not found' });
  }
  const store = await getUserStore(user?.storeId as string);
  return NextResponse.json({ status: 200, data: store });
}
