import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout';
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";

export default function tag({ data }: any) {
  // const [id, setId] = useState(0)
  // const [tag, setTag] = useState("")
  // const [author, setAuthor] = useState("")
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  let id = 0
  let tag = ""
  let author = ""
  let tagdata = { id, tag, author };

  const handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    tag = value
    tagdata = { id, tag, author };
    console.log(tagdata)
  };

  const editTag = (e) => {
    console.log(e)
    id = e.id
    tag = e.tag
    author = e.author
    console.log(id)
    console.log(tag)
    console.log(author)
    tagdata = { id, tag, author };

    MySwal.fire({
      html: <div>
        <p className='p-4'>Edit Tag</p>
        <form autoComplete="off">
          <input
            className='w-3/6 appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
            name='tag'
            type='text'
            placeholder={e.tag}
            onChange={handleChange}
          />
        </form>
      </div>
    }).then(()=>{
      console.log(tagdata)
      console.log(tag)
      fetch("http://localhost:8000/tag/" + e.id, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(tagdata)
      })
      router.push("/tag")
    })
  }

  return (
    <Layout>
      <title>Manage Tag</title>
      <div className="bg-gray-50">
        <div className="px-4 py-5 sm:px-6 bg-white shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Manage Tag
          </h3>
        </div>
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className='flex flex-row'>
            <input
              className="w-6/12 m-2 rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm font-medium"
              placeholder='Search' />
            <button
              className="m-2 flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >Add tag</button>
          </div>
          <div className="grid grid-cols-1 gap-y-10 gap-x-2 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
            {data.map((item, index) => {
              return (
                <div key={index} className="w-fit group rounded-full flex flex-row border border-gray-300 hover:bg-indigo-50">
                  <div className='p-2'>
                    <button onClick={() => {
                      editTag(item)
                    }} className="px-3 text-sm font-medium text-gray-900">
                      {item.tag}
                    </button>
                    <button className='scale-125'>
                      <RxCross2 />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('http://localhost:8000/tag');
  const data = await res.json();
  console.log(data);
  // Pass data to the page via props
  return { props: { data } };
}