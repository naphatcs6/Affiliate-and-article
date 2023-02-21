import React from 'react'
import Sidebar from './Sidebar'
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from 'next/router';

export default function Layout({ children }: any) {
  const router = useRouter()
  const currentRoute = router.pathname;
  const chatAtStr = currentRoute.slice(1,2).toLocaleUpperCase()
  const strPath = currentRoute.slice(2,currentRoute.length)
  const textPath = ""+chatAtStr+""+strPath

  return (
    <>
      <div className='h-screen flex flex-row justify-start bg-gray-100 shadow'>
        <Sidebar />
        <div className='flex-1 bg-gray-100 overflow-y-auto shadow'>
          <div className="px-4 py-5 sm:px-6 bg-white shadow">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {textPath}
            </h3>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}