import { useRouter } from 'next/router';
import React, { useState } from 'react'
import styles from "../styles/Home.module.css";
import { validate } from '../utils/validate';
import Router from "next/router";

type Props = {}

export default function authotp({ }: Props) {
  const router = useRouter()
  const [inputs, setInputs] = useState<any>({});
  const {
    query: {
      email,
      otp,
    }
  } = router
  const props = {
    email,
    otp,
  }
  const [values, setValues] = useState({
    email: `${props.email}`,
    otp: `${props.otp}`,
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if(inputs.otp == props.otp){
      console.log("True")
      Router.push({
        pathname: "/authotp",
        query: {
          email,
          otp,
        }
      })
      return router.push('/register')
    }else{
      console.log("False")
    }
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              OTP Verification
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              We've send verification code on your
            </p>
            <p className="mt-2 text-center text-sm text-gray-600">
              email - {props.email}
              TestOTP - {props.otp}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="text"
                  name="otp"
                  value={inputs.otp || ""}
                  onChange={handleChange}
                  placeholder="Enter verification code"
                  required
                  className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                </span>
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}