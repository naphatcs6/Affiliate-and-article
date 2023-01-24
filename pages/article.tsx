import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { RiFileEditLine } from 'react-icons/ri'
import { BsFillTrashFill } from 'react-icons/bs'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function article({ data }: any) {
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  const [search, setSearch] = useState("")
  const { dataSearch } = router.query

  useEffect(() => {
    router.push({
      query: { dataSearch: "" },
    })
  }, [])

  const handleSearch = async (event) => {
    event.preventDefault();
    const value = event.target.value;
    await router.push({
      pathname: router.pathname,
      query: { dataSearch: value },
    })
    setSearch(value)
  };
  const handleBtnSearch = async (event) => {
    await router.push({
      pathname: router.pathname,
      query: { dataSearch: event },
    })
    setSearch(event)
  };

  const removeArticle = (e) => {
    MySwal.fire({
      title: `You want to delete?`,
      text: `${e.title}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: 'Deleted!',
          text: `${e.title}`,
          icon: 'success',
        })
        fetch("http://localhost:8000/article/" + e.id, {
          method: "DELETE"
        }).then((res) => {
        }).catch((err) => {
          console.log(err.message)
        })
        router.push({
          pathname: router.pathname,
          query: { dataSearch: "" },
        })
      }
    })
  }

  return (
    <Layout>
      <title>Article</title>
      <div className="bg-gray-50">
        <div className="px-4 py-5 sm:px-6 bg-white shadow">
          <button onClick={() => {
            router.push({
              pathname: router.pathname,
              query: { dataSearch: "" },
            })
          }}>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Article
            </h3>
          </button>
        </div>
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className='flex flex-row'>
            <input
              className="w-6/12 m-2 rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm font-medium"
              placeholder='Search'
              name='search'
              type='text'
              autoComplete='off'
              onChange={handleSearch}
            />
            <button
              className="m-2 flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => {
                router.push("/addarticle")
              }}
            >Write Article</button>
          </div>
          <div className="flex flex-col">
            {data.map((item, index) => {
              return (
                <div key={index} className="m-2 w-9/12 h-60 group rounded flex flex-row border border-gray-300 hover:bg-indigo-50">
                  <div className='flex flex-row'>
                    <div className='mt-auto mb-auto ml-5 h-40 w-40'>
                      <img
                        className='object-cover h-40 w-full'
                        // width="150"
                        src={item.images}
                      />
                    </div>
                    <div className='flex flex-col'>
                      <div className='text-2xl m-8 font-bold'>
                        {item.title}
                      </div>
                      <div className="mt-auto mr-auto m-2 text-sm font-medium text-gray-900 flex flex-row">
                        {item.tags.map((tag, index) => {
                          return (
                            <div key={index}>
                              <button className="m-2 p-2 group rounded flex flex-row border border-gray-300 hover:bg-indigo-50"
                                onClick={() => {
                                  handleBtnSearch(tag)
                                }}
                              >
                                {tag}
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <div className='ml-auto m-5 flex flex-col'>
                    <button
                      className='m-5 scale-125'
                      onClick={() => {
                        console.log("Edit")
                      }}
                    >
                      <RiFileEditLine className='scale-125' />
                    </button>
                    <button
                      className='m-5 scale-125'
                      onClick={() => {
                        removeArticle(item)
                        console.log("Remove")
                      }}
                    >
                      <BsFillTrashFill className='scale-125' />
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
export async function getServerSideProps(context) {
  // Fetch data from external API
  const { dataSearch } = context.query
  const res = await fetch(`http://localhost:8000/article?q=${dataSearch}`);
  const data = await res.json();
  // console.log(data);
  console.log();
  // Pass data to the page via props
  return {
    props:
    {
      data,
    }
  };
}