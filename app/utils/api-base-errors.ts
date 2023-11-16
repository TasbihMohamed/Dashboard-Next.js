import { NextResponse } from 'next/server';

type Details = {
  message?: string;
  [key: string]: unknown;
};

const Errors = {
  'bad-request': { error: 'Bad Request', code: 400 },
  unauthorized: { error: 'Unauthorized', code: 401 },
  forbidden: { error: 'Forbidden', code: 403 },
  'not-found': { error: 'Not Found', code: 404 },
  'internal-server-error': { error: 'Internal Server Error', code: 500 },
};

export const respond = (
  error: keyof typeof Errors,
  details: Details = {},
): NextResponse => {
  return NextResponse.json(
    { ...Errors[error], ...details },
    { status: Errors[error].code },
  );
};
