import { hasToken } from '@/app/utils/db-helpers';
import { verifyToken } from '@/app/utils/jwt-helpers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const token = await req.text();

  const verified = verifyToken(token);

  if (verified) {
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    );

    if (await hasToken(payload.jti, payload.iat)) {
      return NextResponse.json({ verified, payload });
    } else {
      return NextResponse.json({ verified: false });
    }
  } else {
    return NextResponse.json({ verified });
  }
}
