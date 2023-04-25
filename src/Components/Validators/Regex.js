export const testEmailValidation = (value)=>{
   const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,4}$/g

   return emailPattern.test(value)
}