import {authClient} from "../client";


// ~ =============================================>
// ~ ======= Signup with Google   -->
// ~ =============================================>
/**
 * Sign in with Google credentials
 * @param {string} host - Host of the current client to redirect to
 * @param {any} redirect - Should be a function that takes in a url and redirects to that url
 */
export const signInWithGoogle = async (host: string, redirect: any) => {
   const {data, error} = await authClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
         redirectTo: `${host}/api/auth/callback`
      }
   })
   
   if (error) {
      console.log(error)
      return null;
   }
   
   if (data.url) {
      return redirect(data.url)
   }
}