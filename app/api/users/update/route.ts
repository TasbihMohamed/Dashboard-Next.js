import { updateUserData } from '@/app/utils/db-helpers';
import { createHash } from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId, payload } = await req.json();
  if (userId === null)
    return new NextResponse("malformed request; missing 'id'", {
      status: 400,
    });

  let swapedPayload = payload;
  if (payload.password) {
    const password = createHash('sha-256')
      .update(payload.password)
      .digest('hex');
    swapedPayload['password'] = password;
  }

  const userData = await updateUserData(userId, payload);

  if (userData === null)
    return new NextResponse(
      `object not found; cannot find user with 'id' => '${userId}'`,
      {
        status: 404,
      },
    );

  return NextResponse.json({
    success: true,
    message: 'data has been updated successfuly!',
  });
}
