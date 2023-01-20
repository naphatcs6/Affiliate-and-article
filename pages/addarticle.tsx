import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import { Editor } from '@tinymce/tinymce-react';
import { snackbarContentClasses } from '@mui/material';
import { AiOutlineFileImage } from 'react-icons/ai'
import { useRouter } from 'next/router';
import tag from './tag';

type Props = {}

export default function addarticle({ }: Props) {
  const [value, setValue] = useState('');
  const editorRef = useRef(null);
  const [images, setImage] = useState("");
  const router = useRouter();
  const { dataSearch } = router.query
  const [user, setUser] = useState({
    email: "",
    password: "",
    otp: "",
    firstname: "",
    lastname: "",
    dateborn: "",
    address: "",
    province: "",
    district: "",
    postcode: "",
  })
  useEffect(() => {
    setUser(localStorage.getItem("userLogin") ? JSON.parse(localStorage.getItem("userLogin")!) : "")
    router.push({
      query: { dataSearch: "" },
    })
  }, [])
  let id = 0
  let title = ""
  // let images = ""
  let content = ""
  let author = ""
  let date = new Date
  let tags = []
  let articleAdd = { title, images, content, author, date, tags };

  const handleEditChange = (e) => {
    console.log(e)
    content = e
    console.log(content)
    setValue(e)
  }
  const handleEditorChange = (contents: any, editor: any) => {
    console.log("Content was updated:", contents);
    content = contents
    console.log(content);
    articleAdd = { title, images, content, author, date, tags };

  };


  const handleFileUpload = () => {
    // const file = event.target.files[0];
    // const url = URL.createObjectURL(file);
    // console.log(file)
    // console.log(url)
    // setImage(url);
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
            console.log(reader.result)
            setImage(reader.result)
          }
        }
      }
    }
    input.click();
  };

  const addArt = () => {
    fetch("http://localhost:8000/article", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(articleAdd)
    }).catch((err) => {
      console.log(err.message)
    })
  }
  return (
    <Layout>
      <title>Add Article</title>
      <div className="bg-gray-50">
        <div className="px-4 py-5 sm:px-6 bg-white shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Write Article
          </h3>
        </div>
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className='flex flex-row mb-5'>
            <div className='w-4/12'>
              <input
                className="w-full m-2 rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm font-medium"
                placeholder='Title'
                name='title'
                type='text'
              />
              <button
                className="w-full m-2 mb-4 flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleFileUpload}>
                Choose cover image
              </button>
            </div>
            <div className='ml-20 rounded-lg border-4 border-dashed border-gray-200'>
              <img className='self-stretch' src={images} width="125" />
            </div>
          </div>

          <Editor
            id='id'
            apiKey='kk6o8lcwevnu1qprlaxean940z495icm5vxe4y5bldux04bo'
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
            onEditorChange={handleEditorChange}
          />
          <button
            className="m-2 flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={addArt}
          >Add Article</button>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const { dataSearch } = context.query
  const res = await fetch(`http://localhost:8000/tag?q=${dataSearch}`);
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
