"use client";
import { ROOT_DOMAIN } from "@/utils/constants";
import { createMyBrowserClient } from "@/utils/supabase";
import { useState } from "react";
import { CheckUserRequest, CheckUserResponse } from "../api/public/userexists/route";
import { customApiClient } from "@/utils/helpers";
import { PUBLIC_ROUTES } from "@/middleware";

const ForgotPasswordPage = () => {
    const [err, setErr] = useState("");

    async function reset(formData: FormData) {
        try {
            const sb    = createMyBrowserClient();
            const email = formData.get("email") as string;
    
            // check if user exists first!
            const checkUserReq: CheckUserRequest = { email };

            const url              = ROOT_DOMAIN + "/api/public/userexists";
            const { status, data } = await customApiClient.post<CheckUserRequest, CheckUserResponse>(url, checkUserReq);
            if (status !== 200 && data.error) throw new Error(data.error);
            if (!data.userExists) throw new Error("no data returned.");

            if (data.userExists === true) {
                const resetResponse = await sb.auth.resetPasswordForEmail(email, {
                    redirectTo: ROOT_DOMAIN + PUBLIC_ROUTES["/api/auth/password-reset"],
                });
                if (resetResponse.error) {
                    console.error(resetResponse.error);
                } else {
                    console.log("Check your email.");
                }
            } else {
                console.log("user doesn't exist.");
            }
    
        } catch (e: any) {
            console.error(e);   
        }
    }

    return (
        <div>
            <h2>Reset Your password.</h2>
            <form
                className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
                action={reset}
            >
                <label className="text-md" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                />
                <button
                    className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
                >
                    Reset
                </button>
            </form>
        </div>
    );
}

export default ForgotPasswordPage;