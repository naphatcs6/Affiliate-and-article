import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect } from 'react';

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
    }
  } = router
  const props = {
    email,
    password,
    otp,
  }
  useEffect(() => {
    localStorage.setItem('userLogin', JSON.stringify(inputs));
  }, [inputs]);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(props.email + " " + props.password)
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      email: props.email,
      password: props.password,
    });

    if(inputs.otp == props.otp){
      console.log("OTP is True")
      fetch("http://localhost:8080/user-api/user/register", {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "ok") {
          setInputs({...inputs, email: props.email, password: props.password})
          
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: "success",
          }).then((value) => {
            return router.push('/home')
          });
        } else {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: "error",
          });
        }
      })
      .catch((error) => console.log("error", error));
    }else{
      console.log("oTP is False")
    }
  }

  return (
    <>
      <title>Verify otp</title>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
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