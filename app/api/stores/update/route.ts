import { validateAuth } from '@/app/utils/api-helpers';
import { getUserById, updateUserStore } from '@/app/utils/db-helpers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const updateSchema = z.object({
  storeName: z.string().min(3),
  storeDescription: z.string().min(3),
  storeLogo: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const auth = await validateAuth(request);
  const body = await request.json();
  if (!auth) return NextResponse.json({ status: 401 });
  const user = await getUserById(auth.uid);
  const storeId = user?.storeId;
  const response = updateSchema.safeParse(body);
  if (response.success) {
    const upateData = await updateUserStore(storeId as string, body);
    if (upateData) {
      return NextResponse.json({
        status: 200,
        data: 'Date updated successfuly!',
      });
    } else {
      return NextResponse.json({
        status: 401,
        data: 'Update failed successfuly!',
      });
    }
  }
  if (response.error) {
    return NextResponse.json({
      status: 404,
      error: response.error,
    });
  }
}
