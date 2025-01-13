import {authClient} from "./client";

export {authClient} from './client'
export * from './strategies/email-password'
export * from './strategies/profile'

// ~ =============================================>
// ~ ======= Get current user  -->
// ~ =============================================>
export const getCurrentUser = async () => {
   const {data: user, error} = await authClient.auth.getUser()
   
   if (error) {
      console.log(error.message)
   }
   
   return user
}

// ~ =============================================>
// ~ ======= sign out user  -->
// ~ =============================================>
export const signOutUser = async (redirect: any) => {
   await authClient.auth.signOut()
   redirect('/', 'replace')
}