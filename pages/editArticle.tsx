import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/router';
import { RxCross2 } from "react-icons/rx";

export default function editArticle({ data }: any) {
  const router = useRouter()
  const [search, setSearch] = useState([])
  const { dataSearch } = router.query
  const [id, setId] = useState(0)
  const [title, setTitle] = useState("")
  const [images, setImages] = useState("")
  const [content, setContent] = useState("")
  const [date, setDate] = useState<any>("")
  const [author, setAuthor] = useState("")
  const [tags, setTags] = useState<any>([])
  let articleEdit = { id, title, images, content, author, date, tags };

  const {
    query: {
      idDetail
    }
  } = router
  const props = {
    idDetail
  }

  useEffect(() => {
    fetch("http://localhost:8000/article?id=" + props.idDetail).then((res) => {
      return res.json()
    }).then((resp) => {
      setId(resp[0].id)
      setTitle(resp[0].title)
      setImages(resp[0].images)
      setContent(resp[0].content)
      setDate(resp[0].date)
      setAuthor(resp[0].author)
      setTags(resp[0].tags)
    }).catch((err) => {
      console.log(err.message);
    })
    router.push({
      query: {
        dataSearch: "",
      },
    })
  }, [])

  const handleFileUpload = () => {
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
            setImages(reader.result)
          }
        }
      }
    }
    input.click();
  };
  const handleEditorChange = (contents: any, editor: any) => {
    console.log("Content was updated:", contents);
    setContent(contents)
    articleEdit = { id, title, images, content, author, date, tags };
  };
  const handleRemoveTag = (event) => {
    console.log(event)
    setTags(tags.filter(item => item !== event));
    articleEdit = { id, title, images, content, author, date, tags };
  }
  const handleTitle = (event) => {
    const value = event.target.value;
    setTitle(value)
    console.log(value)
    articleEdit = { id, title, images, content, author, date, tags };
  };
  const handleTag = (event) => {
    console.log(event)
    setTags([...tags, event])
    console.log(tags)
    articleEdit = { id, title, images, content, author, date, tags };
  }
  const handleSearch = async (event) => {
    event.preventDefault();
    const value = event.target.value;
    await router.push({
      pathname: router.pathname,
      query: { dataSearch: value },
    })
    setSearch(value)
  };
  const updateArt = () => {
    console.log(articleEdit)
    fetch("http://localhost:8000/article/" + id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(articleEdit)
    }).catch((err) => {
      console.log(err.message)
    })
    router.push('/article')
  }

  return (
    <Layout>
      <title>Edit Article</title>
      <div className="bg-gray-50">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className='flex flex-row mb-5'>
            <div className='w-6/12'>
              <input
                className="w-full m-2 rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm font-medium"
                placeholder={title}
                name='title'
                type='text'
                onChange={handleTitle}
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
            value={content}
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
          <div>
            <div className='p-2 flex flex-wrap'>
              {tags.map((item, index) => {
                return (
                  <div key={index} className="m-2 w-fit group rounded flex flex-row border border-gray-300 hover:bg-indigo-50">
                    <div className='p-2 flex flex-row'>
                      <div className="px-3 text-sm font-medium text-gray-900">
                        {item}
                      </div>
                      <button onClick={() => [
                        handleRemoveTag(item)
                      ]} className='scale-125'>
                        <RxCross2 />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
            <div
              className="w-full m-2 rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm font-medium"
            >
              <input
                className='outline-none'
                placeholder='Search tag'
                name='search'
                type='text'
                autoComplete='off'
                onChange={handleSearch}
              />
              <div className={`${dataSearch ? "max-h-40" : "h-0"} overflow-y-auto`}>
                {data.map((item, index) => {
                  return (
                    <div key={index} className='m-2 p-2 w-fit group rounded flex flex-row border border-gray-300 hover:bg-indigo-50'>
                      <button onClick={() => {
                        handleTag(item.tag)
                      }}>
                        {item.tag}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className='flex flex-row'>
            <button
              className="m-5 flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={updateArt}
            >Save Article</button>
            <button
              className="m-5 flex justify-center rounded-md border border-transparent bg-gray-600 py-3 px-3 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={() => {
                router.push('/article')
              }}
            >Cancel</button>
          </div>
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