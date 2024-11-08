import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies();
    const user = cookieStore.get('user');

    const isDashboard = request.nextUrl.pathname.includes('/dashboard');
    const isHome = request.nextUrl.pathname === '/';

    if (isDashboard && !user) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (isHome) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
}
