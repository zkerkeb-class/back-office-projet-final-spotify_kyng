import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const cookiesStore = await cookies();

    cookiesStore.delete('token');

    return NextResponse.redirect(new URL('/login', request.url));
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}
