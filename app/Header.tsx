import { createMyBrowserClient, createMyServerClient } from "@/utils/supabase";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const Header = () => {
    

    async function signOut() {
        "use server";
        const sb = createMyServerClient(cookies());
        await sb.auth.signOut();
        return redirect("/login")

        // this seems to work too
        // const sb = createMyBrowserClient();
        // await sb.auth.signOut();
        // router.refresh();
    }
    
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href="/">
                            Spark
                        </Link>
                    </li>
                    <li>
                        <Link href="/home">
                            home
                        </Link>
                    </li>
                    <li>
                        <Link href="/login">
                            Login
                        </Link>
                    </li>
                    <li>
                        <form action={signOut}>
                            <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                            Logout
                            </button>
                        </form>
                    </li>
                    {/* Add more links as needed */}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
