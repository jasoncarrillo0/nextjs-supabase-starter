import { cookies } from "next/headers";
import { createMyServerClient } from "@/utils/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Index() {

    
    

    
    /*
        purpose: makes sure user has confirmed email, and a user exists with a session
                 implicitly, the getUser will tell us if a session exists.
        notes: when the user clicks the email confirm, that is when we will update the user's
               entry in the main public.users table
    */
    
  
    
    return (
        <div>
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
                <div>Index Page</div>
                <Link href="/login">Login</Link>
                
            </div>
        </div>
        
    );
}
