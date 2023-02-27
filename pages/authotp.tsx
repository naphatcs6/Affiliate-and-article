import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from 'react';
import { Portal } from '@mui/material';
import Router from "next/router";
import styles from "../styles/Home.module.css";

type Props = {}

export default function authotp({ }: Props) {
  const MySwal = withReactContent(Swal);
  const router = useRouter()
  const [inputs, setInputs] = useState<any>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    dateborn: "",
    address: "",
    province: "",
    district: "",
    postcode: "",
  });
  const {
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
  } = router
  const props = {
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

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      email: props.email,
      password: props.password,
      firstname: props.firstname,
      lastname: props.lastname,
      dateborn: props.dateborn,
      address: props.address,
      province: props.province,
      district: props.district,
      postcode: props.postcode
    });

    if (inputs.otp == props.otp) {
      console.log("OTP is True")
      fetch("http://localhost:8000/users", {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      })
      setInputs(props)
      MySwal.fire({
        html: <i>OTP correct</i>,
        icon: "success",
      }).then((value) => {

        return router.push('/dashboard')
      });
    } else {
      MySwal.fire({
        html: <i>OTP incorrect</i>,
        icon: "error",
      });
      console.log("OTP is False")
    }
  }

  return (
    <>
      <title>Verify otp</title>
      <div className={`${styles.main} bg-zinc-200`}>
        <div className="bg-white border-zinc-300 drop-shadow-2xl rounded flex justify-center items-center flex-col w-1/3 py-14">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="Logo.svg"
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
              {/* TestOTP - {props.otp} */}
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