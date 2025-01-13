import {createClient} from "@supabase/supabase-js";
import {Database} from "../utils/database.types";

const dbUrl = process.env.AUTH_DB_URL || process.env.NEXT_PUBLIC_AUTH_DB_URL as string
const apiSecret = process.env.AUTH_API_SECRET || process.env.NEXT_PUBLIC_AUTH_API_SECRET as string
export const authClient = createClient<Database>(dbUrl, apiSecret);
