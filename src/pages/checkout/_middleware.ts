import { NextFetchEvent, type NextRequest, NextResponse } from 'next/server';
import { jwt } from '../../helpers';

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const url = req.nextUrl.clone();

  const urlReturn = `${url.origin}/auth/login?p=${req.page.name}`;

  const { token = '' } = req.cookies as { token: string };

  if (!token) {
    return NextResponse.redirect(urlReturn);
  }

  try {
    await jwt.verifyToken(token);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(urlReturn);
  }
}
