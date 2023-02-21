import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout';
import { validate } from '../utils/validate';


export default function editprofile({ data }: any) {
  const router = useRouter()
  useEffect(() => {
    setUser(localStorage.getItem("userLogin") ? JSON.parse(localStorage.getItem("userLogin")!) : "")
  }, [])
  const [user, setUser] = useState({
    id: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    dateborn: Date,
    address: "",
    province: "",
    district: "",
    postcode: "",
  })
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    data.map((item, index) => {
      if (item.email == user.email) {
        setUser({ ...user, id: item.id })
      }
    })
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      id: user.id,
      email: user.email,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      dateborn: user.dateborn,
      address: user.address,
      province: user.province,
      district: user.district,
      postcode: user.postcode
    });
    console.log(raw)
    fetch("http://localhost:8000/users/" + user.id, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: raw
      })
    localStorage.setItem('userLogin', JSON.stringify(user));
    console.log("Submit 111")
    router.push('/profile')
  }
  // var year = new Date()
  // console.log(year)
  return (
    <>
      <Layout>
        <title>Edit Profile</title>
        <div className="bg-white shadow h-full">
          <div className="border-t border-gray-200">
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Frist name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <input className='relative block w-3/5 appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      name="firstname"
                      type='text'
                      value={user.firstname}
                      onChange={handleChange}
                      required
                      pattern="[a-zA-Z]{1,15}"
                      title="First name should be alphabets (a to z)."
                    />
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Last name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <input className='relative block w-3/5 appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      name="lastname"
                      type='text'
                      value={user.lastname}
                      onChange={handleChange}
                      required
                      pattern="[a-zA-Z]{1,15}"
                      title="Last name should be alphabets (a to z)."
                    />

                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <input type='email' disabled className='disabled:bg-slate-100 disabled:text-slate-500 relative block w-3/5 appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      value={user.email}
                    />
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Date of birth</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <input className='relative block w-3/5 appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      type='date'
                      name="dateborn"
                      onChange={handleChange}
                    />
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Address detail</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <textarea className='relative block w-3/5 appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                    />
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Province</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <input className='relative block w-3/5 appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      name="province"
                      type='text'
                      value={user.province}
                      onChange={handleChange}
                    />
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">District</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <input className='relative block w-3/5 appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      name="district"
                      type='text'
                      value={user.district}
                      onChange={handleChange}
                    />
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Postcode</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <input className='relative block w-3/5 appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      name="postcode"
                      type='text'
                      value={user.postcode}
                      onChange={handleChange}
                    />
                  </dd>
                </div>
              </dl>
              <footer className="h-20">
                <div className='flex flex-row justify-center'>
                  <Link
                    href="/profile"
                    className="group relative flex w-1/12 justify-center rounded-md border border-transparent bg-gray-500 py-2 px-4 m-8 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    </span>
                    Cancel
                  </Link>
                  <button
                    // onClick={() => { return router.push('/profile') }}
                    type="submit"
                    className="group relative flex w-1/12 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 m-8 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    </span>
                    Save
                  </button>
                </div>
              </footer>
            </form>
          </div>
        </div>
      </Layout>
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