import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout';
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
import { BsSearch } from "react-icons/bs"


export default function tag({ data }: any) {
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  const [dataTag, setTag] = useState(data)
  const [search, setSearch] = useState("")
  const { dataSearch } = router.query

  let id = 0
  let tag = ""
  let author = ""
  let tagdata = { id, tag, author };
  let tagadd = { tag, author };
  useEffect(() => {
    setUser(localStorage.getItem("userLogin") ? JSON.parse(localStorage.getItem("userLogin")!) : "")
    router.push({
      query: { dataSearch: "" },
    })
  }, [])
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

  const handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    tag = value
    tagdata = { id, tag, author };
    console.log(tagdata)
  };
  const handleCreate = (event) => {
    event.preventDefault();
    const value = event.target.value;
    tag = value
    author = user.email
    tagadd = { tag, author };
    console.log(tagadd)
  };
  const handleSearch = async (event) => {
    event.preventDefault();
    const value = event.target.value;
    await router.push({
      pathname: router.pathname,
      query: { dataSearch: value },
    })
    // console.log(dataSearch)
    setSearch(value)
  };

  const addTag = () => {
    MySwal.fire({
      html: <div>
        <p className='p-4'>Add Tag</p>
        <form autoComplete="off">
          <input
            className='w-3/6 appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
            name='tag'
            type='text'
            onChange={handleCreate}
          />
        </form>
      </div>,
      confirmButtonText: 'Add',
      showCancelButton: true,
      preConfirm: () => {
        if (tag !== "") {
          fetch("http://localhost:8000/tag", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(tagadd)
          }).catch((err) => {
            console.log(err.message)
          })
          router.push({
            pathname: router.pathname,
            query: { dataSearch: "" },
          })
        } else {
          MySwal.showValidationMessage(
            `Request failed`
          )
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: 'Add tag success!!',
          icon: 'success'
        })
      }
    })
  }

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
            required
            pattern="[a-zA-Z]{1,15}"
            title="First name should be alphabets (a to z)."
          />
        </form>
      </div>
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: 'Edit tag success!!',
          icon: 'success'
        })
      }
      console.log(tagdata)
      console.log(tag)
      fetch("http://localhost:8000/tag/" + e.id, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(tagdata)
      })
      router.push({
        pathname: router.pathname,
        query: { dataSearch: "" },
      })
    })
  }

  const removeTag = (e) => {
    MySwal.fire({
      title: `You want to delete?`,
      text: `${e.tag}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: 'Deleted!',
          text: `${e.tag}`,
          icon: 'success',
        })
        fetch("http://localhost:8000/tag/" + e.id, {
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
      <title>Manage Tag</title>
      <div className="bg-gray-50">
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
              onClick={addTag}
            >Add tag</button>
          </div>
          <div className="flex flex-wrap">
            {data.map((item, index) => {
              return (
                <div key={index} className="m-2 w-fit group rounded flex flex-row border border-gray-300 hover:bg-indigo-50">
                  <div className='p-2 flex flex-row'>
                    <button onClick={() => {
                      editTag(item)
                    }} className="px-3 text-sm font-medium text-gray-900">
                      {item.tag}
                    </button>
                    <button onClick={() => [
                      removeTag(item)
                    ]} className='scale-125'>
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