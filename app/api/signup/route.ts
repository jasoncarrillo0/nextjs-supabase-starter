import { PUBLIC_ROUTES } from "@/middleware";
import { ROOT_DOMAIN } from "@/utils/constants";
import { customResponse } from "@/utils/helpers";
import { createMyServerClient } from "@/utils/supabase";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export type SignupRequest = {
    email: string;
    pass: string;
    first_name: string;
    last_name: string;
};

export type SignupResponse = {
    error?: string
    success?: boolean
}

const log = console.log;
export async function POST(request: Request) {
    try {

        // validate input
        const json = await request.json();
        log("request is to sign up is: ", json)

        const { email, pass, first_name, last_name } = json as SignupRequest;
        if (!email || !pass || !first_name || !last_name) {
            log("missing a field!!")
            return customResponse<SignupResponse>(400, { error: "missing field"})
        }


        // create client + credentials
        const jar = cookies();
        const sb = createMyServerClient(jar);


        const credentials: SignUpWithPasswordCredentials = {
            email,
            password: pass,
            options: {
                emailRedirectTo: ROOT_DOMAIN + PUBLIC_ROUTES["/api/auth/confirm-user"],
                data: { // data field here writes to user_metadata on the auth.users table
                    first_name,
                    last_name
                }
            }
        };

        // sign in user
        log("attempting sign up....")
        const { error, data } = await sb.auth.signUp(credentials);
        if (error) throw new Error(error.message);

        log ("signed up user.....")

        // I defined custom functions to standardize successful and error responses
        return customResponse<SignupResponse>(200, { success: true });
    } catch (e: any) {
        console.log(e);
        console.log(e.message);
        return customResponse<SignupResponse>(500, { error: e.message });
    }
}
