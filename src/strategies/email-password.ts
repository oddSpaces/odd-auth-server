import { AuthClient } from "../client";
import { generateAccountId } from "../utils/idGen.js";

export const signInWithEmailPassword = async (formData: {
  email: string;
  password: string;
  firstName: string;
  lastname: string;
}) => {
  const client = new AuthClient().ssr_client();

  // ~ ======= perform signup -->
  const { data, error } = await client.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        firstName: formData.firstName,
        lastName: formData.lastname,
        hogId: generateAccountId(),
      },
    },
  });

  // ~ ======= create user if account was created successfully -->
  if (data.user) {
    const { data: profile, error: profileError } = await client
      .from("Profiles")
      .insert({
        firstName: data.user?.user_metadata.firstName,
        lastName: data.user?.user_metadata.lastName,
        email: data.user?.email,
      })
      .select()
      .single();

    return profile;
  }

  if (error) {
    console.error(error);
  }
};
