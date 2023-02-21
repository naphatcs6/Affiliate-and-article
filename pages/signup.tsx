import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import styles from "../styles/Home.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function signup({ data }: any) {
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const [inputs, setInputs] = useState({
    id: "",
    email: "",
    otp: `${Math.floor(100000 + Math.random() * 900000)}`,
    password: "",
    firstname: "",
    lastname: "",
    dateborn: "",
    address: "",
    province: "",
    district: "",
    postcode: "",
  });


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otp = inputs.otp
    const email = inputs.email
    const password = inputs.password
    const firstname = inputs.firstname
    const lastname = inputs.lastname
    const dateborn = inputs.dateborn
    const address = inputs.address
    const province = inputs.province
    const district = inputs.district
    const postcode = inputs.postcode

    data.map((item, index) => {
      if (item.email == inputs.email && item.password == inputs.password) {
        localStorage.setItem('userLogin', JSON.stringify(inputs));
        MySwal.fire({
          html: <i>User Exit</i>,
          icon: "error",
        })
      } else {
        console.log(inputs)
        localStorage.setItem('userLogin', JSON.stringify(inputs));
        Router.push({
          pathname: "/authotp",
          query: {
            email,
            password,
            otp,
            firstname,
            lastname,
            dateborn,
            address,
            province,
            district,
            postcode
          }
        })
        return router.push('/authotp')
      }
    })

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
    } catch (e) {
      console.log(e);
    }
    console.log(inputs);
  };
  return (
    <>
      <title>Sign up</title>
      <div className={`${styles.main} bg-zinc-200`}>

        <div className="bg-white border-zinc-300 drop-shadow-2xl rounded flex justify-center items-center flex-col w-1/3 py-14">
          <img
            className="mx-auto h-12 w-auto"
            src="Logo.svg"
            alt="Your Company"
          />
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up to your account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <dl className="flex flex-col">
              <div className="mr-2 ml-2 mb-2">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <input className='relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    name="email"
                    type='email'
                    value={inputs.email}
                    onChange={handleChange}
                    required
                  // autoComplete="off"
                  />
                </dd>
              </div>
              <div className="mr-2 ml-2 mb-2">
                <dt className="text-sm font-medium text-gray-500">Password</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <input className='relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    name="password"
                    type='password'
                    value={inputs.password}
                    onChange={handleChange}
                    required
                  />
                </dd>
              </div>
              <div className="flex flex-row">
                <div className="mr-2 ml-2 mb-2">
                  <dt className="text-sm font-medium text-gray-500">Frist name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <input className='relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      name="firstname"
                      type='text'
                      value={inputs.firstname}
                      onChange={handleChange}
                      required
                      pattern="[a-zA-Z]{1,15}"
                      title="First name should be alphabets (a to z)."
                      autoComplete="off"
                    />
                  </dd>
                </div>
                <div className="mr-2 ml-2 mb-2">
                  <dt className="text-sm font-medium text-gray-500">Last name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <input className='relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      name="lastname"
                      type='text'
                      value={inputs.lastname}
                      onChange={handleChange}
                      required
                      pattern="[a-zA-Z]{1,15}"
                      title="Last name should be alphabets (a to z)."
                      autoComplete="off"
                    />
                  </dd>
                </div>
              </div>
              <div className="mr-2 ml-2 mb-2">
                <dt className="text-sm font-medium text-gray-500">Address detail</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <textarea className='relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    name="address"
                    value={inputs.address}
                    onChange={handleChange}
                  />
                </dd>
              </div>
              <div className="flex flex-row">
                <div className="mr-2 ml-2 mb-2">
                  <dt className="text-sm font-medium text-gray-500">Province</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <input className='relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      name="province"
                      type='text'
                      value={inputs.province}
                      onChange={handleChange}
                    />
                  </dd>
                </div>
                <div className="mr-2 ml-2 mb-2">
                  <dt className="text-sm font-medium text-gray-500">District</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <input className='relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      name="district"
                      type='text'
                      value={inputs.district}
                      onChange={handleChange}
                    />
                  </dd>
                </div>
              </div>
              <div className="mr-2 ml-2 mb-2">
                <dt className="text-sm font-medium text-gray-500">Postcode</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <input className='relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    name="postcode"
                    type='text'
                    value={inputs.postcode}
                    onChange={handleChange}
                  />
                </dd>
              </div>
            </dl>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
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