import { NextFetchEvent, type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
// import { jwt } from '../../helpers';

export default async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // https://nextjs.org/docs/messages/middleware-relative-urls
  if (!session) {
    const url = req.nextUrl.clone();
    const urlReturn = `${url.origin}/auth/login?p=${req.page.name}`;
    return NextResponse.redirect(urlReturn);
  }

  return NextResponse.next();

  // const url = req.nextUrl.clone();
  // const urlReturn = `${url.origin}/auth/login?p=${req.page.name}`;
  // const { token = '' } = req.cookies as { token: string };
  // if (!token) {
  //   return NextResponse.redirect(urlReturn);
  // }
  // try {
  //   await jwt.verifyToken(token);
  //   return NextResponse.next();
  // } catch (error) {
  //   return NextResponse.redirect(urlReturn);
  // }
}
