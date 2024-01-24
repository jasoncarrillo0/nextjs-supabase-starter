import { User } from "@/types/db";
import { createMyServerClient } from "./supabase";
import { cookies } from "next/headers";
import { TABLES } from "./constants";


/*
    fields that postgres automatically creates upon addition of row in db:
    created_at, updated_at, acct_status

    password not included in users table, should only be kept on private auth.users table
*/

export type CoreUserFields = Omit<User, "created_at" | "updated_at" >;
export async function createUser(fields: CoreUserFields) {
    const jar = cookies();
    const sb = createMyServerClient(jar)

    const {data, error} = await sb.from(TABLES.users).insert(fields);
    if (error) throw new Error(error.message);

    console.log("postgres write result for creating a user: ", data);
}


/*
    existingId: id from the auth.users table
    purpose: to make sure a user doesn't exist on the public.users table
             used when creating a user when a user confirms their email.
    other notes: the user must be signed in in order for this function to work
*/
export async function publicUserExists(existingId: string): Promise<boolean> {
    const jar = cookies();
    const sb = createMyServerClient(jar);

    const { data, error } = await sb.from(TABLES.users).select().eq("id", existingId);
    if (error) throw new Error(error.message);

    if (data) {
        if (data.length >= 1) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}