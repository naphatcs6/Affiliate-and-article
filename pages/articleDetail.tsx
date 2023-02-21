import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { RxAvatar } from 'react-icons/rx'


export default function articleDetail({ data, datac }: any) {
  const router = useRouter()
  const [content, setContent] = useState("")
  const [idarticle, setID] = useState("")
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
  let dateString = "";
  const {
    query: {
      idDetail
    }
  } = router
  const props = {
    idDetail
  }
  let author = user.firstname + " " + user.lastname
  const articleid = idarticle
  let date = new Date
  console.log(articleid)
  let commentdata = { content, author, date, articleid };
  useEffect(() => {
    setUser(localStorage.getItem("userLogin") ? JSON.parse(localStorage.getItem("userLogin")!) : "")
    setID(localStorage.getItem("idarticle") ? JSON.parse(localStorage.getItem("idarticle")!) : "")
    router.push({
      pathname: router.pathname,
      query: { dataSearch: props.idDetail },
    })
  }, [])

  const onAddComment = () => {
    commentdata = { content, author, date, articleid };
    console.log(commentdata)
    fetch("http://localhost:8000/comments", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(commentdata)
    }).catch((err) => {
      console.log(err.message)
    })
  }
  const handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setContent(value)
  };

  return (
    <>
      <Layout>
        <title>Article Detail</title>
        <div className="bg-gray-50">
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
          <div className='m-5 p-2 border border-gray-300 rounded w-1/3'>
            <div className='flex flex-row'>
              <img
                className="h-12 w-auto px-1"
                src="jason.svg"
                alt="avatar"
              />
              <p className='mr-2'>{user.firstname}</p>
              <p className=''>{user.lastname}</p>
            </div>
            <div className='p-3 flex flex-row h-fit'>
              <textarea
                className='resize-none w-full px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                placeholder='Add comment'
                name='comment'
                onChange={handleChange}
              />
            </div>
            <div className='p-3'>
              <button
                className='w-1/3 rounded-full border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                onClick={onAddComment}
              >
                Add comment
              </button>
            </div>
          </div>

          {datac.map((item, index) => {
            return (
              <div key={index} className='m-5 p-2 border border-gray-300 rounded w-1/3'>
                <div className='flex flex-row'>
                  <img
                    className="h-12 w-auto px-1"
                    src="anime-face.svg"
                    alt="avatar"
                  />
                  <p className='mr-2'>{item.author}</p>

                </div>
                <div className='p-3 flex flex-row'>
                  <p className=''>{item.content}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Layout>
    </>

  )
}

export async function getServerSideProps(context) {
  const { dataSearch } = context.query
  const res = await fetch(`http://localhost:8000/article?id=${dataSearch}`);
  const data = await res.json();
  const resc = await fetch(`http://localhost:8000/comments?articleid=${dataSearch}`);
  const datac = await resc.json();
  return {
    props:
    {
      data,
      datac
    }
  };
}