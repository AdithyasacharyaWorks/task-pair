import { NextResponse } from "next/server";
import Cookies from "js-cookie";

export async function POST() {
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


