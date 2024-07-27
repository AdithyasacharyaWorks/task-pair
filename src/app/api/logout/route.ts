import { NextResponse } from "next/server";
import Cookies from "js-cookie";
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route'; 


export async function POST() {
    const session = await getServerSession(authOptions);
      if (!session) {
            return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
        }
    // Clear the token cookie
    const tokenCookieOptions = { HttpOnly: true, Path: '/', Secure: true, SameSite: 'Strict' };
    Cookies.remove('token', tokenCookieOptions);

    // Clear the appContextState cookie
    const appContextStateCookieOptions = { expires: 1, Path: '/' }; // Set the same options as in AppWrapper
    Cookies.remove('appContextState', appContextStateCookieOptions);

    const response = NextResponse.json({
        status: 200,
        data: "logout successful",
    });

    return response;
}


