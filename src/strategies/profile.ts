import { AuthClient } from "../client";
import { generateAccountId } from "../utils/idGen";

export const th_createTinyHogProfile = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  imageUrl?: string;
}) => {
  const client = new AuthClient().ssr_client();

  const { data, error } = await client
    .from("Profiles")
    .insert({
      ...formData,
      hog_id: generateAccountId(),
      imageUrl:
        formData.imageUrl ||
        "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Ryan",
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};

export const th_getProfileByID = async (id: string) => {
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
