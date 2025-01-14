import { AuthClient } from "../client";

export const createTinyHogProfile = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  hogId: string;
  profileImage?: string;
}) => {
  const client = new AuthClient().ssr_client();

  const { data, error } = await client
    .from("Profiles")
    .insert(formData)
    .select()
    .single();

  return data;
};
