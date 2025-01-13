import {authClient} from "../client";
import {generateAccountId} from "../utils/idGen.js";

export const signInWithEmailPassword = async (formData: {
   email: string, password: string, firstName: string, lastname: string,
}) => {
   // ~ ======= perform signup -->
   const {data, error} = await authClient.auth.signUp({
      email: formData.email, password: formData.password, options: {
         data: {
            firstName: formData.firstName, lastName: formData.lastname, hogId: generateAccountId()
         }
      }
   })
   
   // ~ ======= create user if account was created successfully -->
   if (data.user) {
      const {
         data: profile, error: profileError
      } = await authClient.from('Profiles').insert({
         firstName: data.user?.user_metadata.firstName,
         lastName: data.user?.user_metadata.lastName,
         email: data.user?.email,
      }).select().single()
      
      return profile
   }
   
   if (error) {
      console.error(error)
   }
   
}