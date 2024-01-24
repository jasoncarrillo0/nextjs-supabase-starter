## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Clone this repo into a local folder

3. Create a `.env.local` file in the root of the project and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

4. create a bash script (name it what you want) with the following commands

   ```
   npx supabase gen types typescript --project-id "<your supabase project id>" --schema public > types/db.ts
   ```
   
   `chmod +x your-file-name.sh`` to be able to execute it.
   at the end of the command, you can name the output file anything. I chose db.ts because the main types that are generated are 
   the database types.

5. Create the database schema in your project in supabase
    In the SQL editor run the queries in this order
    ```
    CREATE TYPE acct_status_types AS ENUM ('confirmed', 'unconfirmed', 'deleted', 'suspended');

    -- Recreate the users table without the password field
    CREATE TABLE users (
        id UUID PRIMARY KEY UNIQUE,
        first_name text NOT NULL,
        last_name text NOT NULL,
        email text UNIQUE NOT NULL,
        acct_status acct_status_types DEFAULT 'unconfirmed',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        other_fields JSONB
    );


    -- Recreate the orphaned_users table without the password field
    CREATE TABLE orphaned_users (
        id UUID PRIMARY KEY UNIQUE,
        first_name text NOT NULL,
        last_name text NOT NULL,
        email text UNIQUE NOT NULL,
        acct_status acct_status_types DEFAULT 'unconfirmed',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        other_fields JSONB
    );
    ```

    And then run this:

    ```
    alter table public.users enable row level security;

    create policy "Users are viewable only by authenticated users"
    on public.users for select
    to authenticated
    using ( true );

    create policy "New user can create their own public.users entry"
    on public.users for insert
    to authenticated
    with check ( true );


    create policy "Only a user can update their own public.users entry"
    on public.users for update
    to authenticated
    using ( auth.uid() = id);
    ```

5. You can now run the Next.js local development server:

   ```
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).


## Important Notes
- Online tutorials and stackoverflow questions often involve the 'auth-helpers' library, which is not recommended by supabase.
   
- The recommended package is the /ssr one. the /ssr package has only createBrowserClient and createServerClient for creating a`supabase` instance for the frontend and backend respectively. so if you see a tutorial that is doing something on the backend but is using some other function from another package, you can just use the `createServerClient` function, and the `createBrowserClient` frontend. You might see a function called the really weird "createClient" or "createClientBrowserClient". the `ssr` package simplifies all the bad naming to simply have one function for creating a supabase instanace for the frontend and backend. I think the purpose of the `ssr` package is to simplify the bad naming, automatically handle configuring cookies (really nice), and to provide a package that applies to other platforms besides nextjs.
   
     
   
- the `anon` key and project id keys are safe to expose on the frontend.
   
     
   
 - As a general rule, it's better to perform db functions on the backend. At this point, I'm only comfortable doing Frontend querying (using the supabase client instance) for read-only operations. Row level security must be enabled in order to have any security on tables. If RLS is off, anyone can do anything with tables.
   
  - When looking at the documentation, there seems to be an overlap between the `ssr` package as well as the `supabase-js` package; the `ssr` borrows code from the `supabase-js` library. It's a bit confusing, but I just default to using the `ssr`package whenever possible.
