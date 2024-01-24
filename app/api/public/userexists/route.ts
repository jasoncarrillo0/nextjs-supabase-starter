import { PUBLIC_ROUTES } from "@/middleware";
import { User } from "@/types/db";
import { customResponse } from "@/utils/helpers";
import { createMyServerClient } from "@/utils/supabase";
import { SignUpWithPasswordCredentials, createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export type CheckUserRequest = {
    email: User["email"]
};

export type CheckUserResponse = {
    userExists?: boolean
    error?: string
}
const log = console.log;


/*
    purpose: to check if a user exists when a user tries to reset their password. They shouldn't be able to reset
            their password if they don't exist!
    Notes: this is one of the routes that uses the service_role key that bypasses all row level security policies.

*/
export async function POST(request: Request) {
    const payload: CheckUserResponse = { userExists: false };

    try {

        // validate input
        const json = await request.json();

        const { email } = json as CheckUserRequest;
        if (!email) {
            log("missing email")
            payload.error = "missing field";
            return customResponse<CheckUserResponse>(400, payload);
        }


        log("attempting to create instance with service key....")

        const jar = cookies();
        const sb = createMyServerClient(jar, process.env.SERVICE_ROLE_KEY);

        

        /*
            IMPORTANT: without the service key, this query will still run, but no error will be given.
            it will just return error as null and data as an empty array.
        */
        const { error, data } = await sb.from("users").select().eq("email", email);
        if (error) throw new Error(error.message);
        if (data.length === 1) {
            payload.userExists = true;
        }

        // I defined custom functions to standardize successful and error responses
        return customResponse<CheckUserResponse>(200, payload)

    } catch (e: any) {
        console.log(e);
        payload.error = e.message;
        return customResponse<CheckUserResponse>(500, payload);
    }
}
