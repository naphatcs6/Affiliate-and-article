import Link from 'next/link'
import React from 'react'
import styles from "../styles/Home.module.css"
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
import Router from "next/router";
import { validate } from '../utils/validate';

type Props = {}

export default function signup({ }: Props) {
  const router = useRouter()
  // const otp = ""+Math.floor(100000 + Math.random() * 900000)
  const [values, setValues] = useState({
    email: '',
    otp: `${Math.floor(100000 + Math.random() * 900000)}`,
    password: '',
  });
  
  const [errors, setErrors] = useState<{email?: string; otp?: string }>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(values);
    e.preventDefault();
    const errosr = validate(values)
    const isError = Object.keys(errosr).length
    if (isError && isError > 0) {
      console.log(errors)
      setErrors(errors)
      return
    }
    try{
      const res = await fetch('/api/send',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      })
      if(!res.ok){
        setValues({email: '',otp: '' ,password: ''})
      }
    }catch(e){
      console.log(e);
    }
    console.log(values);
    const email = values.email
    const otp = values.otp
    Router.push({
      pathname: "/authotp",
      query: {
        email,
        otp,
      }
    })
    return router.push('/authotp')
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
              Sign up to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
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
                  type="email"
                  name="email"
                  value={values.email || ""}
                  onChange={onChange}
                  placeholder="Email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={values.password || ""}
                  onChange={onChange}
                  placeholder="password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}