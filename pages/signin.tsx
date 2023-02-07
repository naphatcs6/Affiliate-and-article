import React from "react";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
import Router from "next/router";

export default function signin({ data }: any) {

  const [inputs, setInputs] = useState<any>({
    email: "",
    password: "",
    otp: "",
    firstname: "",
    lastname: "",
    dateborn: Date,
    address: "",
    province: "",
    district: "",
    postcode: "",
  });
  const MySwal = withReactContent(Swal);
  const router = useRouter();


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    data.map((item, index) => {
      if (item.email == inputs.email && item.password == inputs.password) {
        localStorage.setItem('userLogin', JSON.stringify(inputs));
        MySwal.fire({
          html: <i>Login Success</i>,
          icon: "success",
        }).then((value) => {

          return router.push('/dashboard')
        });
      } else {
        MySwal.fire({
          html: <i>User not exits</i>,
          icon: "error",
        });
      }
    })
  };
  return (
    <>
      <title>Sign in</title>
      <div className={`${styles.main} bg-zinc-200`}>
        <img
          className="mx-auto h-12 w-auto"
          src="Logo.svg"
          alt="Your Company"
        />
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in your account
        </h2>
        <div className="bg-white border-zinc-300 drop-shadow-2xl rounded flex justify-center items-center flex-col w-1/3 py-14">
          <form onSubmit={handleSubmit} className="mt-2 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  // autoComplete="off"
                  type="email"
                  name="email"
                  value={inputs.email || ""}
                  onChange={handleChange}
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
                  value={inputs.password || ""}
                  onChange={handleChange}
                  placeholder="password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 mr-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:8000/users`);
  const data = await res.json();
  console.log();
  return {
    props:
    {
      data,
    }
  };
}