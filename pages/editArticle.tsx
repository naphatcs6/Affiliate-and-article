import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/router';


export default function editArticle({ data }: any) {
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
    <Layout>
      <title>Edit Article</title>
      <div className="bg-gray-50">
        <div className="px-4 py-5 sm:px-6 bg-white shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Edit Article
          </h3>
        </div>
        {data.map((item, index) => {
          return (
            <div key={index} className="mx-auto max-w-2xl py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className='flex flex-row mb-5'>
                <div className='w-6/12'>
                  <input
                    className="w-full m-2 rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm font-medium"
                    placeholder={item.title}
                    name='title'
                    type='text'
                  // onChange={handleTitle}
                  />
                  <button
                    className="w-full m-2 mb-4 flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Choose cover image
                  </button>
                </div>
                <div className='ml-20 rounded-lg border-4 border-dashed border-gray-200'>
                  <img className='self-stretch' src={item.images} width="125" />
                </div>
              </div>

              <Editor
                id='id'
                apiKey='kk6o8lcwevnu1qprlaxean940z495icm5vxe4y5bldux04bo'
                initialValue={item.content}
                init={{
                  plugins: 'image code advlist autolink lists link charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
                  toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter | alignright alignjustify | bullist numlist outdent indent | image',
                  image_title: true,
                  file_picker_types: 'image',
                  file_picker_callback: function (callback, value, meta) {
                    let input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.onchange = function () {
                      if (input.files) {
                        let file = input.files[0];
                        let reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function () {
                          if (typeof reader.result === "string") {
                            callback(reader.result);
                          }
                        }
                      }
                    }
                    input.click();
                  }
                }}
              />
            </div>
          )
        })}
      </div>
    </Layout>
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