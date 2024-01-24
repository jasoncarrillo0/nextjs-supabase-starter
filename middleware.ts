import { NextResponse, type NextRequest } from "next/server";
import { createMyMiddlewareClient } from "./utils/supabase";

/* 
    IMPORTANT: This file defines GLOBAl middleware. NExtjs looks for a file called middleware.ts at the root of the project,
    and uses that file for global middleware. It will always run before on every page and api request, before request gets to the backend.
*/

export const PUBLIC_ROUTES = {
    "/api/auth/confirm-user": "/api/auth/confirm-user",
    "/api/auth/password-reset": "/api/auth/password-reset",
    "/api/public/userexists": "/api/public/userexists",
    "/login": "/login",
    "/api/signup": "/api/signup",
    "/": "/",
    "/sign-up": "/sign-up",
    "/forgot-password": "/forgot-password",
    "/password-reset": "password-reset"
}

const allowedOrigins = {
    dev: "http://localhost:3000",
    prod: process.env.PROD_DOMAIN,
};


export async function middleware(request: NextRequest) {
    console.log("-----> [[ req to: ", request.nextUrl.href, "]]");
    
    try {
        //ensure request is coming from allowed origins according to environment
        if (process.env.NEXT_PUBLIC_DEV_ENV === "local") {
            if (request.nextUrl.origin !== allowedOrigins.dev) {
                return NextResponse.redirect("/login");
            }
        } else {
            if (request.nextUrl.origin !== allowedOrigins.prod) {
                return NextResponse.redirect("/login");
            }
        }

        /*
            We need to ensure that the user is signed in to access protected routes.
            auth.getSession() will renew the user's cookie session if it exists.
            session will be null if user is not logged in. also, we must call getSession()
            in middleware in order to renew their sessions.

            IMPORTANT: the session can always be tampered with by the user. In other words, don't use data from
                use auth.getSession() for user data, you must use auth.getUser() instead in order to retrieve accurate user info
                but it seems that the auth.getSession() still reliably tells us if a user is logged in or not. it will be null if not logged in

                Links: https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
                        https://youtu.be/ywvXGW6P4Gs
        */

        const reqIsOnPublicRoute     = (request.nextUrl.pathname in PUBLIC_ROUTES);
        const { supabase, response } = createMyMiddlewareClient(request);
        const { data: { session }}   = await supabase.auth.getSession();
        const isLoggedIn             = session !== null;

        if (reqIsOnPublicRoute) {
            // redirect user to home if user is logged in
            if (isLoggedIn && request.nextUrl.pathname === PUBLIC_ROUTES["/login"]) {
                return NextResponse.redirect(new URL("/home", request.url));
            }

            // otherwise, continue to the target route
            return NextResponse.next({
                request: {
                    headers: request.headers,
                },
            });
        } else {
            
            if (isLoggedIn) {
                // return the "response" object created by createMyMiddlewareClient. 
                // it does something with cookies and the NextResponse object that is important
                // i used code from the starter file, although I don't know what it does and why
                return response;
            } else {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }
    } catch (e) {
        // If you are here, a Supabase client could not be created!
        // This is likely because you have not set up environment variables.
        console.log(e)
        return NextResponse.next({
            request: {
                headers: request.headers,
            },
        });
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
