import { createHmac, randomUUID } from 'crypto';
import { User } from '../types/DataBase';

export interface JWTPayload {
  jti: string;
  iss: string;
  iat: number;
  exp: number;
}

export interface JWTUserPayload extends JWTPayload {
  uid: string;
  sub: 'user';
  firstName: string;
  lastName: string;
}

const JWT_HEADER = Buffer.from(
  JSON.stringify({
    typ: 'JWT',
    alg: 'HS256',
  }),
).toString('base64url');

const HMAC_SECRET = Buffer.from(
  'P6evJactRww+6P8s7CVgOFbiHCSlD+JHQGcS41Vp5jc=',
  'base64',
);

const sign = (data: string): string =>
  createHmac('sha256', HMAC_SECRET).update(data).digest('base64url');

export function verifyToken(token: string): boolean {
  if (!/^[A-Z0-9-_]+\.[A-Z0-9-_]+\.[A-Z0-9-_]+$/i.test(token)) return false;

  const [header, payload, signature] = token.split('.');

  return sign(`${header}.${payload}`) === signature;
}

export function parseToken<Payload = JWTPayload>(
  token: string,
): null | Payload {
  if (!verifyToken(token)) return null;

  const [, payload] = token.split('.');

  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString());
  } catch (e) {
    return null;
  }
}

const DayMS = 86400000;

export function refreshToken<Payload = JWTPayload>(payload: Payload): string {
  const iat = Date.now();

  const PAYLOAD = Buffer.from(
    JSON.stringify({
      ...payload,
      iat,
      exp: iat + DayMS, // One day
    }),
  ).toString('base64url');

  const TOKEN_DATA = `${JWT_HEADER}.${PAYLOAD}`;

  const SIGNATURE = sign(TOKEN_DATA);

  return `${TOKEN_DATA}.${SIGNATURE}`;
}

export function generateUserToken(user: User): string {
  const iat = Date.now();
  const jti = randomUUID({ disableEntropyCache: true });

  const PAYLOAD = Buffer.from(
    JSON.stringify({
      firstName: user.firstName,
      lastName: user.lastName,
      uid: user._id,
      iss: 'shoptak-platform',
      sub: 'user',
      jti,
      iat,
      exp: iat + DayMS, // One day
    }),
  ).toString('base64url');

  const TOKEN_DATA = `${JWT_HEADER}.${PAYLOAD}`;

  const SIGNATURE = sign(TOKEN_DATA);

  return `${TOKEN_DATA}.${SIGNATURE}`;
}
