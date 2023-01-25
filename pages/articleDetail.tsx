import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Layout from '../components/Layout'



export default function articleDetail({ data }: any) {
  const router = useRouter()

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
              return (
                <div key={index}>
                  <div className='text-2xl m-8 font-bold'>
                    {item.title}
                  </div>
                  <img
                    width='150'
                    src={item.images}
                  />
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
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