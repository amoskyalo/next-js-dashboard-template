import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

//just an example
const protectedRoutes = ['dashboard', 'customers', 'settings'];

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies();
    const user = cookieStore.get('user');

    const requestedRoute = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some((route) => requestedRoute.includes(route));

    if (isProtectedRoute && !user) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (requestedRoute === '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
}
