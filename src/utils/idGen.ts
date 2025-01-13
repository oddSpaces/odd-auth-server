/**
 * Generates unique account Ids
 * @param length
 */
export function generateAccountId(length = 24): string {
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   const timestamp = new Date().getTime().toString(36);
   let randomPart = '';
   
   
   for (let i = 0; i < length - timestamp.length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomPart += characters[randomIndex];
   }
   
   return `hog_${timestamp}${randomPart}`;
}
