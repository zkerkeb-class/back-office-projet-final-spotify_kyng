import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request) {
  const url = new URL(request.url);
  url.pathname = "/login";
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token') || undefined;
  if (!token) {
    // verify the token valid
    return NextResponse.redirect(url.toString());
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
