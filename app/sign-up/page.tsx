"use client";

import { useState } from "react";
import SignupForm from "./SignupForm";
import { SignupRequest, SignupResponse } from "../api/signup/route";
import Link from "next/link";
import { ROOT_DOMAIN } from "@/utils/constants";
import { customApiClient } from "@/utils/helpers";

const SignUpPage = () => {
    const [signUpPass, setSignUpPass] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [signedUp, setSignedUp] = useState(false);

    async function submitSignUp() {
        if (!signUpEmail || !first || !last || !signUpPass) {
            throw new Error("please ensure all 4 fields are filled out.");
        }

        if (signUpPass.length <= 6) throw new Error("password must be at least 6 characters.");
            

        const signupReq: SignupRequest = {
            email: signUpEmail,
            pass: signUpPass,
            first_name: first,
            last_name: last,
        };
        const url            = ROOT_DOMAIN + "/api/signup";
        const signupResponse = await customApiClient.post<SignupRequest, SignupResponse>(url, signupReq);

        

        if (signupResponse.status !== 200) {
            console.error("failed to sign up user. error: ", signupResponse.data.error);
        } else {
            console.log("Successfully signed up user.");
            setSignedUp(true);
        }
    }
    return (
        <div>
            <h1 className="flex items-center justify-center">Sign Up</h1>
            <SignupForm
                email={signUpEmail}
                setEmail={setSignUpEmail}
                pass={signUpPass}
                setPass={setSignUpPass}
                first={first}
                setFirst={setFirst}
                last={last}
                setLast={setLast}
            />

            <button
                onClick={submitSignUp}
                disabled={!signUpPass || !signUpEmail}
                className="inline-flex disabled:bg-slate-400 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
                Sign Up
            </button>
            <div>
                Already have an account? <Link href="/login">Login here.</Link>
            </div>

            {signedUp ? (
                <div>Please confirm your email to finish signing up.</div>
            ) : null}
        </div>
    );
};

export default SignUpPage;
