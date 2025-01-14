import {createBrowserClient, createServerClient} from "@supabase/ssr";
import {Database} from "../utils/database.types";
import {cookies} from 'next/headers'


class AuthClient {
   private readonly dbUrl: string
   private readonly apiSecret: string
   
   constructor() {
      this.dbUrl = process.env.AUTH_DB_URL || process.env.NEXT_PUBLIC_AUTH_DB_URL as string
      this.apiSecret = process.env.AUTH_API_SECRET || process.env.NEXT_PUBLIC_AUTH_API_SECRET as string
   }
   
   // ~ ======= browser client -->
   client() {
      return createBrowserClient<Database>(this.dbUrl, this.apiSecret)
   }
   
   // ~ ======= server client -->
   ssr_client() {
      const cookieStore = cookies()
      return createServerClient<Database>(this.dbUrl, this.apiSecret, {
         cookies: {
            getAll() {
               return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
               try {
                  cookiesToSet.forEach(({name, value, options}) => {
                     cookieStore.set(name, value, options)
                  })
               } catch (error) {
               }
            }
            
         }
      })
   }
   
}

const authBrowserClient = new AuthClient().client()

export {AuthClient, authBrowserClient}