import React, { useState } from "react";
import Layout from "../components/Layout";
import Image from "next/image";
import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";

type Props = {};

export default function building({ data }: any) {
  const [link, setLink] = useState("link/12345")
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const handleChange = (event) => {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setLink(`${"link/" + result}`)
  };
  return (
    <Layout>
      <title>Building</title>
      <div className="bg-gray-50">
    
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data.map((item) => (
              <div key={item.id} className="group">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={item.image}
                    alt=""
                    className="h-40 w-full object-cover object-center"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {item.name}
                  </p>
                  <button onClick={handleChange} className="group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-1 px-1 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Generate Link
                  </button>
                </div>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  {item.province}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-300 p-4">
          <div className="flex flex-cols justify-end">
            <div className="px-2">Generate Link</div>
            <div className="px-2">
              <div className="bg-white w-40 rounded px-2">
                <Link href="">{link}</Link>
              </div>
            </div>
            <div className="px-2 hover:bg-gray-200">
              <button>Copy link</button>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:8000/rests`);
  const data = await res.json();
  console.log(data);
  // Pass data to the page via props
  return { props: { data } };
}
