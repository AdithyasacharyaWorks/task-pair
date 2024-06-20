// // import { NextResponse } from 'next/server';
// // import type { NextRequest } from 'next/server';
// // // import { jwtVerify } from 'jose';
// // import { getUserSession } from './lib/session';

// import { NextRequest } from "next/server";
// import action from "./app/actions/action";
// import { getUserSession } from "./lib/session";
// import actionlogin from "./app/actions/actionlogin";

// // export async function middleware(request: NextRequest) {
// //     const path = request.nextUrl.pathname;
// //     const isPublicPath = path === '/login' || path === '/signup';
// //     const token = request.cookies.get('token')?.value;

// //     // Ensure SECRET_KEY is defined
// //     const SECRET_KEY = process.env.NEXT_AUTH_SECRET;
// //     if (!SECRET_KEY) {
// //         throw new Error('SECRET_KEY_FOR_TOKEN is not defined');
// //     }
// //     const encodedSecretKey = new TextEncoder().encode(SECRET_KEY);

// //     // Fetch user session
// //     const user = await getUserSession();
// //     console.log(JSON.stringify(user));

// //     let isValidToken = false;
// //     let email = null;

// //     // if (token) {
// //     //     try {
// //     //         const { payload } = await jwtVerify(token, encodedSecretKey);
// //     //         isValidToken = true;
// //     //         email = payload.email; // Assuming the token payload contains an email field
// //     //     } catch (error) {
// //     //         console.error('Invalid token:', error);
// //     //         isValidToken = false;
// //     //     }
// //     // }

// //     // Ensure headers are sent only once
// //     if (isPublicPath && isValidToken) {
// //         return NextResponse.redirect(new URL('/', request.nextUrl));
// //     }

// //     if (!isPublicPath && !isValidToken) {
// //         return NextResponse.redirect(new URL('/login', request.nextUrl));
// //     }

// //     // Proceed with the request if above conditions are not met
// //     return NextResponse.next();
// // }

// // export const config = {
// //     matcher: [
// //         '/',
// //         '/task',
// //         '/task/list',
// //         '/login',
// //         '/signup',
// //         '/profile',
// //     ]
// // };
// export async function middleware(request:NextRequest){

//     // const fun =async()=>{

//     //     const user = await actionlogin()
//     // }
//     const path = request.nextUrl.pathname;
//     const isPublicPath = path === '/login' || path === '/signup'|| path === '/';
//     console.log("pathname",path,"is public path",isPublicPath);
// }

// export const config = {
//     matcher: [
//         '/',
//         '/task',
//         '/task/list',
//         '/profile',
//         '/login',
//         '/signup',
//     ]
// };


import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const isAuthPage = pathname === "/api/auth/signin";
        const isHomePage = pathname === "/home";

        if (isAuthPage || isHomePage) {
            return NextResponse.next();
        }

        if (!req.nextauth.token) {
            return NextResponse.redirect(new URL('/home', req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: [
        '/',
        '/task',
        '/task/list',
        '/profile',
        '/home',
        '/requests'
    ],
};
