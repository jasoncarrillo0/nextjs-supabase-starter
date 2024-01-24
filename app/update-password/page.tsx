"use client";

import Input from "@/components/Input";
import { createMyBrowserClient } from "@/utils/supabase";
import { useState } from "react";

/*
    purpose: this page actually changes the user's password.

    Notes: it may seem like this page is insecure, but it is secure for the following reasons:
    (1) this page is not a public route: only authed users can reach this page (middleware check)
    (2) the below code that changes the password is actually the browser client, which seems odd to do.
        but we redirected to this page from the password-reset auth route, which signed a user in with 
        the supabase generated code. This is also the 2nd check to authenticate the user.
    (3) the client-side generated supabase instance is connected to our project, which is connected to
        supabase's auth mechanism. Since we already authed the user prior to this page load, the client 
        instance can perform authed actions. For consistency, it may be better to just do it all on the backend,
        instead of doing some things on the frontend and some on the backend.
*/

const PasswordResetPage = () => {

    const [newPass, setNewPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [err, setErr]         = useState("");


    async function reset() {
        
        const sb = createMyBrowserClient();
        const { data, error } = await sb.auth.updateUser({password: newPass});
        if (error) {
            console.error(error);
        } else {
            console.log(data, 'successfully updated password.');
            // redirect to dashboard from here.
        }
    
    }

    return (
        <div>
            <h2>Reset Your password.</h2>
            <div
                className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
            >
               <Input text={newPass} setText={setNewPass} type="password" label="password" />
               <Input text={confirm} setText={setConfirm} type="password" label="password" />
                <button
                    className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
                    disabled={newPass !== confirm}
                    onClick={reset}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default PasswordResetPage;