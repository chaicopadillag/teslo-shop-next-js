import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || '' });

  const url = req.nextUrl.clone();

  if (!session) {
    const urlReturn = `${url.origin}/auth/login?p=${req.page.name}`;
    return NextResponse.redirect(urlReturn);
  }

  const validRoles = ['ADMIN', 'SEO'];

  if (!validRoles.includes(session.user.role)) {
    return NextResponse.redirect(`${url.origin}/404`);
  }
  console.log('dashboard middleware');

  return NextResponse.next();
}
