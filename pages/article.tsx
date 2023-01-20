import { useRouter } from 'next/router';
import React from 'react'
import Layout from '../components/Layout'


export default function article({ data }: any) {
  const router = useRouter();

  return (
    <Layout>
      <title>Article</title>
      <div className="bg-gray-50">
        <div className="px-4 py-5 sm:px-6 bg-white shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Article
          </h3>
        </div>
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className='flex flex-row'>
            <input
              className="w-6/12 m-2 rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm font-medium"
              placeholder='Search'
              name='search'
              type='text'

            />
            <button
              className="m-2 flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => {
                router.push("/addarticle")
              }}
            >Write Article</button>
          </div>
          <div className="flex flex-wrap">
            {data.map((item, index) => {
              return (
                <div key={index} className="m-2 w-fit group rounded-full flex flex-row border border-gray-300 hover:bg-indigo-50">
                  <div className='p-2 flex flex-row'>
                    {item.title}
                    {/* <div dangerouslySetInnerHTML={{ __html: item.content }} /> */}
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
  const res = await fetch(`http://localhost:8000/article`);
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