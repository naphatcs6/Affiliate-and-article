import React from "react";
import { Sidebardata } from "../data/Sidebardata";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoExitOutline } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";

const clientId = "1070375292655-f066dq1p4b8s9l7hnedbs4n73uk356ao.apps.googleusercontent.com"

export default function Sidebar({ }: any) {
  const router = useRouter()
  const [open, setOpen] = useState(true);
  const currentRoute = router.pathname;
  const { data: session } = useSession()

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`lg:hidden block absolute top-5 right-5 scale-125 rounded-sm hover:bg-zinc-300 bg-zinc-200`}>
        <AiOutlineMenu />
        <div className={`${open ? "hidden" : "block"} transition duration-300`}>
          <ul>
            {Sidebardata.map((item, index) => {
              return (
                <li key={index} className='p-1 w-full hover:bg-zinc-300 flex rounded'>
                  <Link href={item.path} className={`rounded flex flex-row hover:bg-zinc-300`}>
                    <div className="p-1 scale-125">{item.icon}</div>
                    <div className={`${!open && "hidden"}`}>{item.title}</div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </button>
      <div className={`${open ? "w-50" : "w-16"} lg:block hidden transition duration-300 h-screen px-4 pt-8 pb-4 flex-col border-r-2 border-zinc-300 bg-zinc-200 `}>
        <div className="flex justify-center py-5">
          <button onClick={() => setOpen(!open)} className={`${!open && "rotate-180 py-0"} py-2 duration-300 rounded scale-125`}>
            <img
              className="h-12 w-auto px-1"
              src="Logo.svg"
              alt="Your Company"
            /></button>
        </div>
        <div>
          <ul>
            {Sidebardata.map((item, index) => {
              return (
                <li key={index}
                  className={`${currentRoute === item.path ? "bg-zinc-300" : "bg-zinc-200"} p-1 w-full hover:bg-zinc-300 flex rounded`}>
                  <Link href={item.path}
                    className='rounded flex flex-row'>
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
            signOut({ callbackUrl: "http://localhost:3000/sign" })
            router.push('/sign')
            localStorage.removeItem("userLogin")
          }} className={`${!open && "hidden"}`}>Sign out</button>
        </div>
      </div>
    </>
  );
}
