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

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};

export const getProfileById = async (id: string) => {
  const client = new AuthClient().ssr_client();

  const { data, error } = await client
    .from("Profiles")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};
