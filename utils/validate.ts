export const validate = ({email, password,otp,firstname,lastname,dateborn,address,province,district,postcode,message}: {
    email: string,
    password: string,
    otp: string,
    firstname: string,
    lastname: string,
    dateborn: Date,
    address: string,
    province: string,
    district: string,
    postcode: string,
    message: string,
}) => {
  const errors:{email?: string; password?: string; otp?: string; 
    firstname?: string; lastname?: string; dateborn?: Date; address?: string;
    province?: string; district?: string; postcode?: string; message?: string;}= {}
  if(!firstname || firstname.trim() == ''){
    errors.firstname = 'First name is required'
  }
  if(!lastname || lastname.trim() == ''){
    errors.lastname = 'Last name is required'
  } 
  if(!message || message.trim() == ''){
    errors.message = 'Message is required'
  }
  // if(!email || email.trim() == ''){
  //   errors.email = 'Email is'
  // }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9•-]+\.[A-Z]{2,4}$/i.test(email)){
  //   errors.email = 'Invalid email address'
  // }
  return errors
}
