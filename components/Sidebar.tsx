import React from "react";
import { Sidebardata } from "../data/Sidebardata";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar({ }: any) {
  const [open, setOpen] = useState(true);


  const router = useRouter()

  return (
    <div className={`${open ? "w-50" : "w-20"} h-screen px-4 pt-8 pb-4 bg-gray-300 flex flex-col`}>
      <button onClick={() => setOpen(!open)} className="hover:bg-blue-500">Open</button>
      <div>
        <ul>
          {Sidebardata.map((item, index) => {
            return (
              <li key={index} className='p-1 w-full hover:bg-blue-500 flex justify-center rounded'>
                <Link href={item.path} className='hover:bg-blue-500 rounded'>
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mt-auto flex justify-center hover:bg-blue-500 rounded p-1">
        <button onClick={() => {
          router.push('/sign')
          // localStorage.removeItem("userLogin")
        }}>Sign out</button>
      </div>
    </div>
  );
}
