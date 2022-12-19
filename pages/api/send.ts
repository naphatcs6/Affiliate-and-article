import type { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

type Data = {
  success: boolean
}

export default async function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
  if(req.method = 'POST'){
    const {email,otp}:{email:string,otp:string} = req.body
    const msg ={
      to: email,
      from: 'all2bot123@gmail.com',
      subject: `Example send you a message`,
      text: `Email => ${email}`,
      html: `<strong>Your otp code is ${otp}</strong>`
    }
    try{
      await sgMail.send(msg)
      res.status(200).json({success: true})
    }catch(e){
      res.status(200).json({success: false})
    }
  }
}

