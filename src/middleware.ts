import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup';
    const token = request.cookies.get('token')?.value;
    const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY_FOR_TOKEN);

    let isValidToken = false;
    let email = null;

    if (token) {
        try {
            const { payload } = await jwtVerify(token, SECRET_KEY);
            isValidToken = true;
            email = payload.email; // Assuming the token payload contains an email field
        } catch (error) {
            console.error('Invalid token:', error);
            isValidToken = false;
        }
    }

    if (isPublicPath && isValidToken) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!isPublicPath && !isValidToken) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    const response = NextResponse.next();
    
    return response;
}

export const config = {
    matcher: [
        '/',
        '/task',
        '/task/list',
        '/login',
        '/signup',
        '/profile',
    ]
}


