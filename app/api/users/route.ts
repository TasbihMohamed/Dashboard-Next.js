import { getUserById } from '@/app/utils/db-helpers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const userID = req.nextUrl.searchParams.get('id');

  if (userID === null)
    return new NextResponse("malformed request; missing param 'id'", {
      status: 400,
    });

  const user = await getUserById(userID);

  if (user === null)
    return new NextResponse(
      `object not found; cannot find user with 'id' => '${userID}'`,
      {
        status: 404,
      },
    );

  return NextResponse.json(user);
}
