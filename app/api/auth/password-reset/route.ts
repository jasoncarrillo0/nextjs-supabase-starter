import { customResponse } from "@/utils/helpers";
import { createMyServerClient } from "@/utils/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export type PasswordResetResponse = {
    error?: string;
}
export async function GET(request: Request) {
    try {
        const requestUrl = new URL(request.url);
        const code = requestUrl.searchParams.get("code");

        if (code) {
            const supabase = createMyServerClient(cookies());
            await supabase.auth.exchangeCodeForSession(code);

            return NextResponse.redirect(
                `${requestUrl.origin}/update-password`
            );
        }

        console.error("no auth code found");

        return NextResponse.redirect(`${requestUrl.origin}/login`);

    } catch (e: any) {
        console.log(e);
        console.log(e.message);
        return customResponse<PasswordResetResponse>(500, {error: e.message});
    }
}
