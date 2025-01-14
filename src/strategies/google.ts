import { AuthClient } from "../client";

// ~ =============================================>
// ~ ======= Signup with Google   -->
// ~ =============================================>
/**
 * Sign in with Google credentials
 * @param {string} host - Host of the current client to redirect to
 */
export const signInWithGoogle = async (host: string) => {
  const client = new AuthClient().ssr_client();

  const { data, error } = await client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${host}/api/auth/callback`,
    },
  });

  if (error) {
    console.log(error);
    return null;
  }

  return data;
};
