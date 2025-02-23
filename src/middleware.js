import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decodeJWT } from './utils';

export async function middleware(request) {
  const url = new URL(request.url);
  url.pathname = '/login';
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token') || undefined;
  if (!token) {
    // verify the token valid
    return NextResponse.redirect(url.toString());
  }
  const decoded = decodeJWT(token.value);
  const userRole = decoded.role;
  const isAlbumPage = request.nextUrl.pathname.startsWith('/albums');
  const isAdminPage = request.nextUrl.pathname === '/';

  // Restrict access to `/` - Artists NOT allowed
  if (isAdminPage && userRole === 'artist') {
      const url = request.nextUrl.clone()
  url.pathname = '/albums'
    return NextResponse.rewrite(url); // Artists redirected to album page
  }

  // Allow admins & other roles to access `/album`, only block if needed
  if (isAlbumPage && userRole !== 'artist' && userRole !== 'admin') {
    return NextResponse.redirect('/'); // Redirect non-admins and non-artists
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
