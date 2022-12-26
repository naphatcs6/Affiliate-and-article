import React, { useState } from "react";
import Layout from "../components/Layout";
import Image from "next/image";
import CardMedia from "@mui/material/CardMedia";

type Props = {};

export default function building({ data }: any) {
  return (
    <Layout>
      <div className="bg-gray-50">
        <div className="px-4 py-5 sm:px-6 bg-white shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Building
          </h3>
        </div>
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data.map((item) => (
              <div key={item.id} className="group">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={item.image}
                    alt=""
                    className="h-40 w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {item.name}
                  </p>
                  <button className="group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-1 px-1 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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
      </div>
      <footer>
        <div className="bg-gray-300 p-4">
          <div className="flex flex-cols justify-end">
            <div className="px-2">Generate Link</div>
            <div className="px-2">
              <input value="Some link" className="rounded"/>
            </div>
            <div className="px-2 hover:bg-gray-200">
              <button>Copy link</button>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:8080/rest-api/rest`);
  const data = await res.json();
  console.log(data);
  // Pass data to the page via props
  return { props: { data } };
}
