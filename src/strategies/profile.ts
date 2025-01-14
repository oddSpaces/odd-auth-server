import { AuthClient } from "../client";

const createProfile = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  hogId: string;
}) => {
  const client = new AuthClient().ssr_client();

  const { data, error } = await client
    .from("Profiles")
    .insert(formData)
    .select()
    .single();

  return data;
};
