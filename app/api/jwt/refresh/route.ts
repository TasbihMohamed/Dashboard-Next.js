import { respond } from '@/app/utils/api-base-errors';
import { hasToken, setToken } from '@/app/utils/db-helpers';
import { JWTPayload, refreshToken, verifyToken } from '@/app/utils/jwt-helpers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const token = await req.text();

  const verified = verifyToken(token);

  if (!verified) return respond('bad-request', { message: 'invalid token' });

  const payload = JSON.parse(
    Buffer.from(token.split('.')[1], 'base64').toString(),
  );

  if (await hasToken(payload.jti, payload.iat)) {
    const token = refreshToken<JWTPayload>(payload);

    const newPayload: JWTPayload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    );

    await setToken(newPayload.jti, newPayload.iat);

    return new NextResponse(token, {
      headers: { 'content-type': 'text/plain' },
    });
  } else {
    return respond('unauthorized', { message: 'invalid token' });
  }
}
