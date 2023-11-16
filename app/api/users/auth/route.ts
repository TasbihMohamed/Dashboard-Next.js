import { respond } from '@/app/utils/api-base-errors';
import { addToken, getUserByEmail } from '@/app/utils/db-helpers';
import { generateUserToken } from '@/app/utils/jwt-helpers';
import { createHash } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

type Body = {
  email: string;
  password: string;
};

const notFoundErrorMessage = 'email and/or password are/is incorrect';

export async function POST(req: NextRequest) {
  const body: Body = await req.json().catch(() => null);

  if (
    body === null ||
    typeof body.email !== 'string' ||
    typeof body.password !== 'string'
  )
    return respond('bad-request');

  const user = await getUserByEmail(body.email);

  if (user === null)
    return respond('not-found', {
      message: notFoundErrorMessage,
    });

  const password = createHash('sha-256').update(body.password).digest('hex');

  if (password !== user.password)
    return respond('not-found', {
      message: notFoundErrorMessage,
    });

  const token = generateUserToken(user);
  const payload = JSON.parse(
    Buffer.from(token.split('.')[1], 'base64').toString(),
  );

  await addToken(payload.jti, payload.iat);

  return NextResponse.json({
    success: true,
    token: token,
    userData: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
}
