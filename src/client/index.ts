import {createBrowserClient} from "@supabase/ssr";
import {Database} from "../utils/database.types";

const dbUrl = process.env.AUTH_DB_URL || process.env.NEXT_PUBLIC_AUTH_DB_URL as string
const apiSecret = process.env.AUTH_API_SECRET || process.env.NEXT_PUBLIC_AUTH_API_SECRET as string
export const authClient = createBrowserClient<Database>(dbUrl, apiSecret);
