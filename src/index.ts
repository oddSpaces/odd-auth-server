import { AuthClient } from "./client";
import "module-alias/register";

export { AuthClient } from "./client";
export * from "./strategies/email-password";
export * from "./strategies/profile";
export * from "./strategies/google";

// ~ =============================================>
// ~ ======= Get current user  -->
// ~ =============================================>
export const getCurrentUser = async () => {
  const client = new AuthClient().ssr_client();

  const { data: user, error } = await client.auth.getUser();

  if (error) {
    console.log(error.message);
  }

  return user;
};

// ~ =============================================>
// ~ ======= sign out user  -->
// ~ =============================================>
export const signOutUser = async (redirect: any) => {
  const client = new AuthClient().ssr_client();

  await client.auth.signOut();
  redirect("/", "replace");
};

// ~ =============================================>
// ~ ======= TODO: Most of these should be in the "NEXT" folder  -->
// ~ =============================================>