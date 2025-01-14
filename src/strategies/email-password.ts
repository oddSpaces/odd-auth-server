import { AuthClient } from "../client";
import { generateAccountId } from "../utils/idGen.js";
import { th_createTinyHogProfile } from "./profile";

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
      },
    },
  });

  // ~ ======= create user if account was created successfully -->
  if (data.user && data.user.email) {
    return await th_createTinyHogProfile({
      firstName: data.user?.user_metadata.firstName,
      lastName: data.user?.user_metadata.lastName,
      email: data.user?.email,
    });
  }

  if (error) {
    console.error(error);
  }
};
