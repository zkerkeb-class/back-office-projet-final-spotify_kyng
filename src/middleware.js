import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request) {
  const url = new URL(request.url);
  url.pathname = "/auth/login";
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token') || undefined;
  console.log(token, 'TOKEN FROM MIDDLEWARE');
  if (!token) {
    // verify the token valid
    return NextResponse.redirect(url.toString());
  }
}

export const config = {
  matcher: '/',
};
