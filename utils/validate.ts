export const validate = ({email, otp}: {
  email: string
  otp: string
}) => {
  const errors:{email?: string;otp?: string}= {}
  if(!email || email.trim() == ''){
    errors.email = 'Email is'
  }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9•-]+\.[A-Z]{2,4}$/i.test(email)){
    errors.email = 'Invalid email address'
  }
  return errors
}
