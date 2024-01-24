"use client";

import { useState } from "react";
import { createMyBrowserClient } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/Input";

export default function Login({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const router            = useRouter();

    async function submitLogin() {
        if (!email || !pass) {
            throw new Error("please ensure all fields are filled out.");
        }

        const sb = createMyBrowserClient();
        const sbRes = await sb.auth.signInWithPassword({
            email,
            password: pass,
        });

        if (sbRes.error) {
            console.log(sbRes);
        } else {
            router.push("/home");
        }
    }

    return (
        <div>
            <h1 className="flex items-center justify-center">
                Login
            </h1>
            <div>
                <Input
                    type="email"
                    label="email"
                    text={email}
                    setText={setEmail}
                />
                <Input
                    type="text"
                    label="password"
                    text={pass}
                    setText={setPass}
                />
            </div>

            <button
                onClick={submitLogin}
                disabled={!pass || !email}
                className="inline-flex disabled:bg-slate-400 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
                Login
            </button>
            <div>
                Don't have an account? <Link href="/sign-up">Sign-up here.</Link>
            </div>
            <Link href="/forgot-password">I forgot my password.</Link>
        </div>
    );
}
