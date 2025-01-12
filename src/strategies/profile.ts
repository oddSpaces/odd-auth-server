import {authClient} from "../client";


const createProfile = async (formData: {
   firstName: string,
   lastName: string,
   email: string,
   hogId: string
}) => {
   const {data, error} = await authClient
      .from('Profiles')
      .insert(formData)
      .select()
      .single();
   
   return data;
}