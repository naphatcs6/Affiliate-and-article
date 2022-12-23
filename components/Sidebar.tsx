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
            <li key={index} className={item.pName}>
              <Link href={item.path}>
                <span>{item.title}</span>
              </Link>
            </li>
          )
        })}
        <button onClick={() => {
          console.log("Outtttttt")
          router.push('/sign')
          // localStorage.removeItem("userLogin")
        }}>Sign out</button>
      </ul>
    </div>
  );
}
