import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { RxAvatar } from 'react-icons/rx'


export default function articleDetail({ data }: any) {
  const router = useRouter()
  let dateString = "";
  const {
    query: {
      idDetail
    }
  } = router
  const props = {
    idDetail
  }

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { dataSearch: props.idDetail },
    })
  }, [])

  return (
    <>
      <Layout>
        <title>Article Detail</title>
        <div className="bg-gray-50">
          <div className="px-4 py-5 sm:px-6 bg-white shadow">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Article Detail
            </h3>
          </div>
          <div className='flex flex-row justify-center'>
            {data.map((item, index) => {
              dateString = item.date
              const date = new Date(dateString);
              const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
              return (
                <div key={index} className='flex flex-col justify-center m-5'>
                  <div className='flex flex-row ml-12'>
                    <img
                      className="h-12 w-auto px-1"
                      src="avatar-batman.svg"
                      alt="avatar"
                    />
                    <div className='flex flex-col'>
                      <p>{item.author}</p>
                      <p className='text-gray-500'>{formattedDate}</p>
                    </div>
                  </div>
                  <div className='text-2xl m-8 font-medium mr-auto ml-auto'>
                    {item.title}
                  </div>
                  <img
                    className='mr-auto ml-auto'
                    width='250'
                    src={item.images}
                  />
                  <div
                    className='m-10'
                    dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>
              )
            })}
          </div>
        </div>
      </Layout>
    </>

  )
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const { dataSearch } = context.query
  const res = await fetch(`http://localhost:8000/article?id=${dataSearch}`);
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