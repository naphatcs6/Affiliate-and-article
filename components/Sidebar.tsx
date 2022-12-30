import React from "react";
import { Sidebardata } from "../data/Sidebardata";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoExitOutline } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react"


export default function Sidebar({ }: any) {
  const [open, setOpen] = useState(true);


  const router = useRouter()

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`lg:hidden block absolute top-5 right-5 scale-150 rounded-sm hover:bg-zinc-300 bg-zinc-200`}>
        <AiOutlineMenu />
        <div className={`${open ? "hidden" : "block"} `}>
          <ul>
            {Sidebardata.map((item, index) => {
              return (
                <li key={index} className='p-1 w-full hover:bg-zinc-300 flex rounded'>
                  <Link href={item.path} className='${} hover:bg-zinc-300 rounded flex flex-row'>
                    <div className="p-1 scale-125">{item.icon}</div>
                    <div className={`${!open && "hidden"}`}>{item.title}</div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </button>
      <div className={`${open ? "w-50" : "w-16"} lg:block hidden duration-300 h-screen px-4 pt-8 pb-4 flex-col border-r-2 border-zinc-300 bg-zinc-200`}>
        <button onClick={() => setOpen(!open)} className={`${!open && "rotate-180"} py-2 mr-auto duration-300 rounded scale-125`}>
          <img
            className="h-12 w-auto px-1"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /></button>
        <div>
          <ul>
            {Sidebardata.map((item, index) => {
              return (
                <li key={index} className='p-1 w-full hover:bg-zinc-300 flex rounded'>
                  <Link href={item.path} className='${} hover:bg-zinc-300 rounded flex flex-row'>
                    <div className="p-1 scale-125">{item.icon}</div>
                    <div className={`${!open && "hidden"}`}>{item.title}</div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="w-40 flex justify-start hover:bg-zinc-300 rounded p-1 mb-5 absolute bottom-0">
          <div className="p-1 scale-125"><IoExitOutline /></div>
          <button onClick={() => {
            router.push('/sign')
            // signOut()
            // localStorage.removeItem("userLogin")
          }} className={`${!open && "hidden"}`}>Sign out</button>
        </div>
      </div>
    </>
  );
}
