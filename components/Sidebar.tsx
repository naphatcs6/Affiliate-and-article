import React from "react";
import { Sidebardata } from "../data/Sidebardata";
import { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";

export default function Sidebar({ }: any) {
  const [sidebar, setsidebar] = useState(false);
  const showSidebar = () => setsidebar(!sidebar);
  const router = useRouter()

  return (
    <div className="h-screen px-4 pt-8 pb-4 bg-gray-300 flex justify-between flex-col w-50">
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
      <footer>
        <div className="flex justify-center hover:bg-blue-500 rounded p-1">
          <button onClick={() => {
            console.log("Outtttttt")
            router.push('/sign')
            // localStorage.removeItem("userLogin")
          }}>Sign out</button>
        </div>
      </footer>
    </div>
  );
}
